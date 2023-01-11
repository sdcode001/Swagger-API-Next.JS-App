// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { useRouter } from 'next/router'
import { MongoClient } from 'mongodb'

/** 
 * @swagger
 *  /api/DeleteByUserID:
 *    delete:
 *      summary: Delete UserObject by userID.
 *      description: Delete User from MongoDB database.
 *      parameters:
 *        - in: query
 *          name: user-ID
 *          schema:
 *            type: string
 *          description: The user-ID of the User to delete.
 *      responses:
 *        '200':
 *          description: User deleted.
 *          content: 
 *            application/json:
 *              schema:
*/
async function deleteHandler(req: NextApiRequest, res: NextApiResponse<{}>){
  
    const items=req.url?.split('=')
    const userid=items?.at(1)
    console.log(userid)
    const client= await MongoClient.connect('mongodb+srv://sdcode001:j92txQCN7mUJWGmx@cluster0.3yr72o9.mongodb.net/database2?retryWrites=true&w=majority')
    const db=client.db()
    const result=await db.collection('users').deleteOne({userID:userid})
    client.close()
    res.status(201).json({message:'User deleted from database'})
}


export default deleteHandler