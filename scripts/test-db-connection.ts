/**
 * Standalone script to test database connection
 * Run with: npx tsx scripts/test-db-connection.ts
 * Or: ts-node scripts/test-db-connection.ts
 */

// IMPORTANT: Load environment variables FIRST before any other imports
// This ensures process.env is populated before mongoose.ts reads MONGO_URI
import { config } from "dotenv";
import { resolve } from "path";
import { existsSync } from "fs";

// Load environment variables from .env.local
const envPath = resolve(process.cwd(), ".env.local");
if (existsSync(envPath)) {
  config({ path: envPath });
} else {
  console.warn('⚠️  Warning: .env.local file not found. Trying .env file...');
  config({ path: resolve(process.cwd(), ".env") });
}

// Now import after environment variables are loaded
import { connectToDatabase } from "../database/mongoose";
import mongoose from "mongoose";

async function testConnection() {
  console.log('🔍 Testing database connection...\n');
  
  try {
    // Check if MONGO_URI is set
    if (!process.env.MONGO_URI) {
      console.error('❌ ERROR: MONGO_URI environment variable is not set!');
      console.log('\n💡 Please create a .env.local file in the root directory with:');
      console.log('   MONGO_URI=your_mongodb_connection_string');
      console.log('\n   Example:');
      console.log('   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database-name');
      console.log('\n   Or for local MongoDB:');
      console.log('   MONGO_URI=mongodb://localhost:27017/database-name');
      process.exit(1);
    }
    
    console.log('📝 Environment check:');
    console.log(`   NODE_ENV: ${process.env.NODE_ENV || 'not set'}`);
    console.log(`   MONGO_URI: ${process.env.MONGO_URI.substring(0, 20)}...`);
    console.log('');
    
    // Attempt connection
    console.log('🔌 Attempting to connect...');
    await connectToDatabase();
    
    // Get connection details
    const connectionState = mongoose.connection.readyState;
    const states = {
      0: 'disconnected',
      1: 'connected',
      2: 'connecting',
      3: 'disconnecting'
    };
    
    const dbName = mongoose.connection.db?.databaseName || 'Unknown';
    const host = mongoose.connection.host || 'Unknown';
    const port = mongoose.connection.port || 'Unknown';
    
    console.log('\n✅ Connection successful!\n');
    console.log('📊 Connection Details:');
    console.log(`   State: ${states[connectionState as keyof typeof states]} (${connectionState})`);
    console.log(`   Database: ${dbName}`);
    console.log(`   Host: ${host}`);
    console.log(`   Port: ${port}`);
    console.log(`   Is Connected: ${connectionState === 1 ? 'Yes ✅' : 'No ❌'}`);
    
    // Test a simple operation
    console.log('\n🧪 Testing database operation...');
    if (mongoose.connection.db) {
      const collections = await mongoose.connection.db.listCollections().toArray();
      console.log(`   Collections found: ${collections.length}`);
      if (collections.length > 0) {
        console.log(`   Collection names: ${collections.map(c => c.name).join(', ')}`);
      }
    } else {
      console.log('   ⚠️  Database object not available');
    }
    
    console.log('\n🎉 All tests passed! Database is working correctly.\n');
    
    // Close connection
    await mongoose.connection.close();
    console.log('🔌 Connection closed.');
    
  } catch (error: any) {
    console.error('\n❌ Connection failed!\n');
    console.error('Error details:');
    console.error(`   Message: ${error.message}`);
    console.error(`   Error: ${error.toString()}`);
    
    if (error.message.includes('MONGO_URI')) {
      console.error('\n💡 Make sure MONGO_URI is set in your .env.local file');
    } else if (error.message.includes('authentication')) {
      console.error('\n💡 Check your MongoDB username and password');
    } else if (error.message.includes('ENOTFOUND') || error.message.includes('ECONNREFUSED')) {
      console.error('\n💡 Check your MongoDB connection string and network connection');
    }
    
    process.exit(1);
  }
}

// Run the test
testConnection();

