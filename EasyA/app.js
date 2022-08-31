// varibles
var express = require('express');
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000;
var fs = require('fs')
var db = require('./fdb');
var app = express();
var multer = require('multer');
var {storage} = require('./upload.js')
var upload = multer({storage: storage('uploads', '', 'A-'+Date.now()+'-'+Math.random()*1000)})
var {log} = console;
// var filename = new Date();
// filename = filename.getDate()+"-"+filename.getMonth()+"-"+filename.getFullYear();
var home = new db('home');
var users = new db('users');

// utility functions
var comma = (digit)=>{
    var formatter =  new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'NGN'
    });
    return formatter.format(digit);
}

// server configurations
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

// routes
app.post('/enroll', upload.fields([{name: "files", maxCount: 12}]), (req, res)=>{
    req.body.date = Date.now();
    req.body.id = req.body.category+'-'+req.body.date+'-'+Math.random()*999;
    req.body.files = req.files['files'].map((f)=>f.filename);
    req.body.files.forEach((e)=>{
        fs.copyFile('./uploads/'+e, './public/house/'+e, err=>log(err));
    })
    home.add(req.body);
    res.redirect('/enroll.html');
})

app.get('/store', (req,res)=>{
    var docs = home.fetch({}).map(element => {
        element.price = comma(element.price);
        return element;
    });
    res.render('store', {home: docs});
});
app.get('/details', (req, res)=>{
    var house = home.fetch({id: req.query.id});
    res.render('details', {home: house})
});
app.get('/photo/:image', (req, res)=>{
    res.redirect('/house/'+req.params.image);
});
app.post('/details', (req, res)=>{
    users.add(req.body);
    var house = home.fetch({id:req.body.home_id});
    res_string = `
    <form id="paymentForm">
        <input type="hidden" name="email" value="${req.body.email}">
    </form>
    <script src="https://js.paystack.co/v1/inline.js"></script> 
    <script>
    var paymentForm = document.getElementById('paymentForm');
    paymentForm.addEventListener('load', payWithPaystack, false);
    function payWithPaystack() {
        var handler = PaystackPop.setup({
        key: 'pk_live_3d0ce961a2a8b60b7c761c7809b19218bae4eb19', // Replace with your public key
        email: '${req.body.email}',
        amount: ${house[0].price} * 100, // the amount value is multiplied by 100 to convert to the lowest currency unit
        currency: 'NGN', // Use GHS for Ghana Cedis or USD for US Dollars
        ref: '', // Replace with a reference you generated
        callback: function(response) {
            //this happens after the payment is completed successfully
            var reference = response.reference;
            alert('Payment complete! Reference: ' + reference);
            // Make an AJAX call to your server with the reference to verify the transaction
        },
        onClose: function() {
            alert('Transaction was not completed, window closed.');
        },
        });
        handler.openIframe();
    }
    payWithPaystack();
    </script>
    `;
    res.send(res_string);
})
app.get('/order/:id', (req, res)=>{
    var doc = home.fetch({id: req.params.id}, 1);
    // doc[0].price = comma(doc[0].price);
    // log(doc);
    res.render('order', {home: doc});
});
app.post('/payment', (req, res)=>{
    // var user = new db('user');
    // user.add(req.body);
    log(req.body);
})
// app.get('/ds/:id', (req, res)=>{a
//     log(req.params.id);
//     res.send(req.params.id)
// })
// end of routes
app.listen(port, ()=>{
    log(`Server listening on port ${port}`);
});