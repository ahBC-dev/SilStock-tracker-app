import { connectToDatabase } from "@/database/mongoose";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET() {
  try {
    // Test the database connection
    await connectToDatabase();
    
    // Get connection state
    const connectionState = mongoose.connection.readyState;
    const states = {
      0: 'disconnected',
      1: 'connected',
      2: 'connecting',
      3: 'disconnecting'
    };
    
    // Get database name
    const dbName = mongoose.connection.db?.databaseName || 'Unknown';
    
    // Get host
    const host = mongoose.connection.host || 'Unknown';
    
    return NextResponse.json({
      success: true,
      message: 'Database connection successful!',
      connection: {
        state: states[connectionState as keyof typeof states] || 'unknown',
        stateCode: connectionState,
        database: dbName,
        host: host,
        isConnected: connectionState === 1
      }
    }, { status: 200 });
    
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: 'Database connection failed',
      error: error.message || 'Unknown error',
      details: error.toString()
    }, { status: 500 });
  }
}

