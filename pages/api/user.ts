// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { MongoClient } from 'mongodb'
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         userID:
 *           type: string
 *           description: The users userID.
 *           example: sdcode001
 *         name:
 *           type: string
 *           description: The users name.
 *           example: "Souvik Dey"
 *         email:
 *           type: string
 *           description: Email ID of user.
 *           example: "souvikdey@mail.com"
 *         password:
 *           type: string
 *           description: Password set by user.
 *           example: "gfuyfy@787" 
 */
type User = {
  userID:string
  name: string
  email:string
  password:string
}



async function Userhandler(req: NextApiRequest, res: NextApiResponse<{}>) {
/** 
 * @swagger
 *  /api/user:
 *    post:
 *      summary: Insert user data to MongoDB database
 *      description: this api is used to insert user data to MongoDB database
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#components/schemas/User' 
 *      responses:
 *        '200':
 *          description: Inserted successfully 
 *          
*/
  if(req.method=='POST'){
    const newUserData=req.body;  
    const client= await MongoClient.connect('mongodb+srv://sdcode001:j92txQCN7mUJWGmx@cluster0.3yr72o9.mongodb.net/database2?retryWrites=true&w=majority')
    const db=client.db()
    const result=await db.collection('users').insertOne(newUserData)
    console.log(result)
    client.close()
    res.status(201).json(result)
  }

/**
 * @swagger
 * /api/user:
 *   get:
 *     summary: List of Users
 *     description: Returns all user documents from MongoDB database
 *     responses:
 *       '200':
 *          content: 
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/User'
 *          description: User objects list from MongoDB database
 */
  else if(req.method=='GET'){
    const client= await MongoClient.connect('mongodb+srv://sdcode001:j92txQCN7mUJWGmx@cluster0.3yr72o9.mongodb.net/database2?retryWrites=true&w=majority')
    const db=client.db()
    const result= await db.collection('users').find().toArray()
        client.close()
        res.status(201).json(result)
  }
  else{
    res.status(404).json({error:'request method is not valid on this endpoint...'})
  }

}


export default Userhandler



