import { SealClient, SessionKey } from '@mysten/seal';
import { WalrusFile } from '@mysten/walrus';
import { SuiClient, getFullnodeUrl } from '@mysten/sui/client';
import { Transaction } from '@mysten/sui/transactions';
import { getAllowlistedKeyServers } from '../utils/sealKeyServers';
import { EnokiService } from './enokiService';
import { fromHEX } from '@mysten/sui/utils';
import { getWalrusClient } from '../lib/walrus-client';

interface ProfileData {
  fullName: string;
  email: string;
  phone: string;
  patientId: string;
  bloodType: string;
  allergies: string;
}

/**
 * Service for encrypting profile data with Seal and storing on Walrus
 */
export class SealWalrusService {
  private sealClient: SealClient;
  private walrusClient: any; // Walrus extended client
  private suiClient: SuiClient;
  private packageId: string;
  private network: 'testnet' | 'mainnet' | 'devnet';
  private sessionKey: SessionKey | null = null;
  private enokiService: EnokiService | null = null;

  constructor(
    packageId: string,
    network: 'testnet' | 'mainnet' | 'devnet' = 'testnet',
    customSealServerIds?: string[],
    enokiPrivateApiKey?: string
  ) {
    // Store network
    this.network = network;
    
    // Normalize packageId: ensure it has 0x prefix and is a valid hex string
    const normalized = packageId.trim();
    this.packageId = normalized.startsWith('0x') ? normalized : `0x${normalized}`;
    
    // Validate packageId format (should be 0x followed by hex characters)
    // Sui package IDs are typically 64 hex characters, but we'll be flexible
    if (!/^0x[a-fA-F0-9]+$/.test(this.packageId) || this.packageId.length < 3) {
      throw new Error(
        `Invalid package ID format: ${this.packageId}. Package ID must be a valid hex string with 0x prefix (e.g., 0x1234...5678).`
      );
    }
    
    // Use the centralized Walrus client
    try {
      this.walrusClient = getWalrusClient(network);
    } catch (error) {
      console.error('Failed to initialize Walrus client:', error);
      throw error;
    }
    
    // Also create a regular SuiClient for Seal
    this.suiClient = new SuiClient({
      url: getFullnodeUrl(network),
    });

    // Get Seal key server IDs - use custom ones if provided, otherwise use allowlisted
    const sealServerObjectIds = customSealServerIds && customSealServerIds.length > 0
      ? customSealServerIds
      : getAllowlistedKeyServers(network);

    if (sealServerObjectIds.length === 0) {
      console.warn(`No Seal key servers configured for network: ${network}. Please provide custom key server IDs.`);
    }

    // Initialize Seal client
    this.sealClient = new SealClient({
      suiClient: this.suiClient,
      serverConfigs: sealServerObjectIds.map((id) => ({
        objectId: id,
        weight: 1,
      })),
      verifyKeyServers: false, // Set to true in production for security
    });

    // Initialize Enoki service if private API key is provided
    if (enokiPrivateApiKey) {
      this.enokiService = new EnokiService(network, enokiPrivateApiKey);
    }
  }

  /**
   * Initialize session key for Seal operations
   * This should be called before encrypting/decrypting
   */
  async initializeSession(userAddress: string, signer?: any): Promise<void> {
    if (!this.sessionKey) {
      // Validate packageId before creating session
      if (!this.packageId || !this.packageId.trim() || this.packageId === '0x0000000000000000000000000000000000000000000000000000000000000000') {
        throw new Error(
          'Invalid package ID. Please set VITE_SUI_PACKAGE_ID in your .env file with a valid Sui package ID.'
        );
      }

      // Validate user address
      if (!userAddress || !userAddress.trim()) {
        throw new Error('User address is required to initialize Seal session.');
      }

      try {
        // Log the package ID being used for debugging
        console.log(`Initializing Seal session with package ID: ${this.packageId} on ${this.network}`);
        
        // Note: Package IDs are not object IDs, so we can't verify them with getObject
        // Seal will validate the package ID when creating the session
        this.sessionKey = await SessionKey.create({
          address: userAddress,
          packageId: this.packageId,
          ttlMin: 30, // Maximum allowed TTL (must be between 1 and 30 minutes)
          signer,
          suiClient: this.suiClient,
        });
      } catch (error) {
        console.error('Error creating Seal session key:', error);
        if (error instanceof Error) {
          if (error.message.includes('does not exist') || 
              error.message.includes('invalid') || 
              error.message.includes('InvalidPackageError')) {
            throw new Error(
              `Invalid package ID: ${this.packageId}\n\n` +
              `Please verify:\n` +
              `1. VITE_SUI_PACKAGE_ID is set in your .env file\n` +
              `2. The package ID is correct (current value: ${this.packageId})\n` +
              `3. The package is deployed to the ${this.network} network\n` +
              `4. Your Move contract includes a seal_approve function in the patients module\n` +
              `5. The package ID format is valid (should be 0x followed by hex characters)\n\n` +
              `Original error: ${error.message}`
            );
          }
        }
        throw error;
      }
    }
  }

  /**
   * Encrypt profile data and store on Walrus
   * Note: Enoki sponsored transactions for Walrus operations require backend support
   * as Walrus writeFiles builds transactions internally. The EnokiService is available
   * for future use or for other transaction types that can be sponsored.
   */
  async saveProfile(
    profileData: ProfileData,
    userAddress: string,
    signer: any, // Wallet signer - can be from dapp-kit or wallet-standard
    threshold: number = 2,
    epochs: number = 3
  ): Promise<{ walrusId: string; backupKey?: string }> {
    console.log('[saveProfile] Starting profile save operation', {
      userAddress,
      threshold,
      epochs,
      profileDataKeys: Object.keys(profileData),
    });

    console.log('[saveProfile] Initializing session...');
    await this.initializeSession(userAddress, signer);
    console.log('[saveProfile] Session initialized successfully');

    // Serialize profile data to JSON bytes
    console.log('[saveProfile] Serializing profile data to JSON...');
    const profileJson = JSON.stringify(profileData);
    const dataBytes = new TextEncoder().encode(profileJson);
    console.log('[saveProfile] Profile data serialized', {
      jsonLength: profileJson.length,
      bytesLength: dataBytes.length,
    });

    // Create identity ID from user address (Seal expects hex string, not bytes)
    // Remove 0x prefix if present, keep as hex string
    const id = userAddress.startsWith('0x') ? userAddress.slice(2) : userAddress;
    const packageIdHex = this.packageId.startsWith('0x') ? this.packageId.slice(2) : this.packageId;
    console.log('[saveProfile] Identity and package ID prepared', {
      id,
      idLength: id.length,
      packageIdHex,
      packageIdHexLength: packageIdHex.length,
      originalPackageId: this.packageId,
    });

    // Encrypt the profile data using Seal
    // Seal encrypt expects packageId and id as hex strings
    console.log('[saveProfile] Starting encryption with Seal...', {
      threshold,
      packageId: packageIdHex,
      id,
      dataSize: dataBytes.length,
    });
    const { encryptedObject: encryptedBytes, key: backupKey } = await this.sealClient.encrypt({
      threshold,
      packageId: packageIdHex,
      id,
      data: dataBytes,
    });
    console.log('[saveProfile] Encryption completed', {
      encryptedBytesLength: encryptedBytes.length,
      hasBackupKey: !!backupKey,
      backupKeyLength: backupKey ? backupKey.length : 0,
    });

    // Upload encrypted data to Walrus
    // Create a WalrusFile from the encrypted bytes
    console.log('[saveProfile] Creating WalrusFile...', {
      identifier: `profile_${userAddress}`,
      encryptedBytesLength: encryptedBytes.length,
    });
    const walrusFile = WalrusFile.from({
      contents: encryptedBytes,
      identifier: `profile_${userAddress}`,
      tags: {
        'content-type': 'application/json',
        'encrypted': 'seal',
      },
    });
    console.log('[saveProfile] WalrusFile created successfully');
    
    // Write to Walrus
    // Note: Walrus writeFiles builds transactions internally and requires a signer.
    // For Enoki sponsored transactions, you would need to:
    // 1. Use a backend service that sponsors the transaction, OR
    // 2. Modify Walrus SDK to support sponsored transactions
    // For now, using regular signer. Enoki sponsorship can be added via backend API.
    console.log('[saveProfile] Uploading to Walrus...', {
      epochs,
      deletable: true,
      hasSigner: !!signer,
    });
    const results = await this.walrusClient.walrus.writeFiles({
      files: [walrusFile],
      epochs,
      deletable: true,
      signer,
    });

    if (results.length === 0) {
      throw new Error("Failed to upload profile to Walrus - no results returned");
    }

    const blobId = results[0]?.id;
    if (!blobId) {
      throw new Error("Failed to get profile blob ID");
    }

    console.log('[saveProfile] Upload to Walrus completed', {
      walrusId: blobId,
    });

    const result = {
      walrusId: blobId,
      backupKey: backupKey ? Array.from(backupKey).map(b => b.toString(16).padStart(2, '0')).join('') : undefined,
    };
    console.log('[saveProfile] Profile save operation completed successfully', {
      walrusId: result.walrusId,
      hasBackupKey: !!result.backupKey,
      backupKeyLength: result.backupKey?.length || 0,
    });

    return result;
  }

  /**
   * Retrieve and decrypt profile data from Walrus
   */
  async loadProfile(
    walrusId: string,
    userAddress: string,
    signer?: any
  ): Promise<ProfileData | null> {
    await this.initializeSession(userAddress, signer);

    try {
      // Download encrypted data from Walrus
      const files = await this.walrusClient.walrus.getFiles({
        ids: [walrusId],
      });
      
      if (files.length === 0) {
        console.warn(`No file found for walrusId: ${walrusId}`);
        return null;
      }
      
      const walrusFile = files[0];
      
      // Get encrypted bytes from WalrusFile
      const encryptedBytes = await walrusFile.bytes();

      // Create identity ID from user address (as hex string)
      // Seal expects the id without 0x prefix for encryption/decryption
      const id = userAddress.startsWith('0x') ? userAddress.slice(2) : userAddress;

      // Create a transaction for seal_approve call
      const tx = new Transaction();
      
      // Build the seal_approve transaction
      // This assumes you have a seal_approve function in your Move contract
      // Adjust the function name and parameters based on your contract
      // Convert hex string to bytes for the transaction
      // fromHEX can handle hex strings with or without 0x prefix
      const idBytes = fromHEX(`0x${id}`);
      tx.moveCall({
        target: `${this.packageId}::patients::seal_approve`,
        arguments: [
          tx.pure.vector('u8', Array.from(idBytes)),
        ],
      });

      const txBytes = await tx.build({ client: this.suiClient });

      // Decrypt the data using Seal
      const decryptedBytes = await this.sealClient.decrypt({
        data: encryptedBytes,
        txBytes,
        sessionKey: this.sessionKey!,
      });

      if (!decryptedBytes) {
        console.error('Failed to decrypt profile data');
        return null;
      }

      // Deserialize JSON from decrypted bytes
      const profileJson = new TextDecoder().decode(decryptedBytes);
      return JSON.parse(profileJson) as ProfileData;
    } catch (error) {
      console.error('Error loading profile from Walrus:', error);
      return null;
    }
  }

  /**
   * Get session key (for reuse across operations)
   */
  getSessionKey(): SessionKey | null {
    return this.sessionKey;
  }

  /**
   * Get Enoki service (for sponsored transactions)
   */
  getEnokiService(): EnokiService | null {
    return this.enokiService;
  }
}

