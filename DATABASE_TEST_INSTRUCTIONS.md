# Database Connection Testing Instructions

This guide will help you test your MongoDB database connection using two different methods.

## Prerequisites

1. **MongoDB Connection String**: Make sure you have your MongoDB connection string ready
   - Format: `mongodb+srv://username:password@cluster.mongodb.net/database-name?retryWrites=true&w=majority`
   - Or: `mongodb://localhost:27017/database-name` (for local MongoDB)

2. **Environment Variables**: Create a `.env.local` file in the root of your project with:
   ```
   MONGO_URI=your_mongodb_connection_string_here
   ```

## Method 1: API Route Test (Recommended for Quick Testing)

This method tests the connection through your Next.js API route.

### Steps:

1. **Make sure your `.env.local` file exists** with your `MONGO_URI`:
   ```
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database-name
   ```

2. **Start your development server** (if not already running):
   ```bash
   npm run dev
   ```

3. **Open your browser** and navigate to:
   ```
   http://localhost:3000/api/test-db
   ```

4. **Check the response**:
   - ✅ **Success**: You'll see a JSON response with connection details:
     ```json
     {
       "success": true,
       "message": "Database connection successful!",
       "connection": {
         "state": "connected",
         "stateCode": 1,
         "database": "your-database-name",
         "host": "cluster.mongodb.net",
         "isConnected": true
       }
     }
     ```
   
   - ❌ **Failure**: You'll see an error message with details about what went wrong

5. **Check your terminal/console** for additional connection logs

---

## Method 2: Standalone Script Test (More Detailed)

This method runs a standalone TypeScript script that provides more detailed information.

### Steps:

1. **Install the required dependency** (if not already installed):
   ```bash
   npm install --save-dev tsx
   ```

2. **Make sure your `.env.local` file exists** with your `MONGO_URI`

3. **Run the test script**:
   ```bash
   npm run test:db
   ```
   
   Or directly with:
   ```bash
   npx tsx scripts/test-db-connection.ts
   ```

4. **Review the output**:
   - ✅ **Success**: You'll see detailed connection information including:
     - Connection state
     - Database name
     - Host and port
     - List of collections (if any)
   
   - ❌ **Failure**: You'll see detailed error messages with troubleshooting tips

---

## Troubleshooting Common Issues

### Issue: "MONGO_URI must be within the environment variables"
**Solution**: 
- Make sure you have a `.env.local` file in the root directory
- Verify the variable name is exactly `MONGO_URI` (case-sensitive)
- Restart your development server after creating/modifying `.env.local`

### Issue: "authentication failed"
**Solution**:
- Check your MongoDB username and password
- Make sure special characters in the password are URL-encoded
- Verify your MongoDB user has the correct permissions

### Issue: "ENOTFOUND" or "ECONNREFUSED"
**Solution**:
- Verify your MongoDB connection string is correct
- Check your internet connection
- If using MongoDB Atlas, verify your IP address is whitelisted
- If using local MongoDB, make sure the MongoDB service is running

### Issue: "tsx: command not found"
**Solution**:
- Install tsx: `npm install --save-dev tsx`
- Or use: `npx tsx scripts/test-db-connection.ts`

---

## Expected Output Examples

### Successful Connection (API Route):
```json
{
  "success": true,
  "message": "Database connection successful!",
  "connection": {
    "state": "connected",
    "stateCode": 1,
    "database": "myapp",
    "host": "cluster0.xxxxx.mongodb.net",
    "isConnected": true
  }
}
```

### Successful Connection (Script):
```
🔍 Testing database connection...

📝 Environment check:
   NODE_ENV: development
   MONGO_URI: mongodb+srv://user...

🔌 Attempting to connect...

✅ Connection successful!

📊 Connection Details:
   State: connected (1)
   Database: myapp
   Host: cluster0.xxxxx.mongodb.net
   Port: 27017
   Is Connected: Yes ✅

🧪 Testing database operation...
   Collections found: 3
   Collection names: users, stocks, watchlists

🎉 All tests passed! Database is working correctly.

🔌 Connection closed.
```

---

## Next Steps

Once your database connection is working:
1. You can start creating Mongoose models
2. Use `connectToDatabase()` in your API routes before database operations
3. The connection is cached, so subsequent calls will reuse the same connection

---

## Security Notes

⚠️ **Important**: 
- Never commit your `.env.local` file to version control
- The `.env.local` file is already in `.gitignore`
- Keep your MongoDB credentials secure
- Use environment variables in production (Vercel, etc.)

