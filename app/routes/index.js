const Users = require('../models').users;
const { Router } = require('express');
const router = Router();


router.get('/', (request, response) => {
    response.render('pages/home', {title: "Deborah Portfolio"});
});


router.post('/contact', async (request, response) => {
    try {
        await Users.create(request.body);
        return response.json({message: "Your Message was sent successfully"})
    } catch (error) {
        console.log(error);
    }
});


module.exports = router;