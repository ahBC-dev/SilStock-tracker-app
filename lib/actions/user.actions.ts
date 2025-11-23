'use server';

import { connectToDatabase } from "@/database/mongoose";


export const getAllUsersForNewsEmail = async () => {
    try {
        //get access to database...
        const mongoose = await connectToDatabase();
        const db = mongoose.connection.db;
        if(!db) throw new Error('Mongoose Connection failed')


        const users = await db.collection('user').find(
            { email: { $exists: true, $ne: null }},
            { projection: { _id: 1, id: 1, email: 1, name: 1, country: 1 }}
        ).toArray();

        return users.filter((user) => user.email && user.name).map((user) => ({
            Id: user.id || user._id?.toString() || '',
            email: user.email,
            name: user.name
        }))

    } catch (e) {
        console.error('Error fetching user news', e);
        return []
    }
}