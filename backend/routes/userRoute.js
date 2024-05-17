// import express from 'express';
// import User from '../models/user.model.js';

// const router = express.Router();

// const schema = User.schema.obj;

// // Create User
// router.post('/', async (request, response) => {
//     try {
//         const missingFields = [];
//         const newUser = {};

//         for (const key in schema) {
//             if (schema[key].required && !request.body[key]) {
//                 missingFields.push(key);
//             }

//             newUser[key] = request.body[key] || schema[key].default;
//         }

//         if (missingFields.length > 0) {
//             return response.status(400).send({
//                 message: `Missing required fields: ${missingFields.join(', ')}`,
//             });
//         }

//         const createdUser = await User.create(newUser);
//         return response.status(201).send(createdUser);
//     } catch (error) {
//         console.log(error.message);
//         response.status(500).send({ message: error.message });
//     }
// });

// // Get All Users
// router.get('/', async (request, response) => {
//     try {
//         const books = await User.find({});

//         return response.status(200).json({
//             count: books.length,
//             data: books,
//         });
//     } catch (error) {
//         console.log(error.message);
//         response.status(500).send({ message: error.message });
//     }
// });

// // Get User by ID
// router.get('/:id', async (request, response) => {
//     try {
//         const { id } = request.params;

//         const user = await User.findById(id);

//         return response.status(200).json(user);
//     } catch (error) {
//         console.log(error.message);
//         response.status(500).send({ message: error.message });
//     }
// });


// export default router;