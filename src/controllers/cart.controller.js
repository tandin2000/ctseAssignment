const Cart = require('../modules/cart.model');

const findUser = async (userId) => {
    return await Cart.find({}).where({userId: userId})
};


const add = async (req, res) =>{
    const data = {
        productId: req.body.productId,
        quantity: req.body.quantity
    }

    const user = await findUser(req.params.user_id);

    if(user.length === 0) { //check if user is existing or not
        const newPayload ={
            userId: req.params.user_id,
            productList: data
        };
        const cartPayLoad = new Cart(newPayload);
        
        await cartPayLoad.save().then((data) =>{
            res.status(200).send({data: data});
        }).catch((err) =>{
            res.status(500).send({err: err.message});
        });

    }else{
        const product =  user[0].productList.filter(x => x.productId === data.productId);

        if(product.length === 0){ //checks product exists or not
            Cart.updateOne(
                { userId: user[0].userId },
                { $push: { productList: data } }
              ).then(() =>{
                res.status(200).send("Added to Cart successfully");
            }).catch((err) =>{
                res.status(500).send({err: err.message});
            });
        }else{
            await Cart.updateOne({},
                {
                  $pull: {
                    productList: {
                       _id: product[0]._id,
                  }
                 }
                }).then(() => {
                    Cart.updateOne(
                        { userId: user[0].userId },
                        { $push: { productList: data } }
                      ).then((data) =>{
                        res.status(200).send("Added to Cart successfully");
                    }).catch((err) =>{
                        res.status(500).send({err: err.message});
                    });;
                }).catch((err) =>{
                    res.status(500).send({err: err});
                })
        }        
    }
};

const get = async (req, res) => {
    await Cart.find({})
    .then(data => {
        res.status(200).send({data: data});
    })
    .catch(error =>{
        res.status(500).send({error: error.message});
    });
};

const update = async (req, res) => {
    const user = await findUser(req.params.user_id);

    if(user.length  !== 0){
        const data = {
            productId: req.params.product_id,
            quantity: req.body.quantity
        }

        const product =  user[0].productList.filter(x => x.productId === req.params.product_id);

        await Cart.updateOne({},
            {
              $pull: {
                productList: {
                   _id: product[0]._id,
              }
             }
            }).then(() => {
                Cart.updateOne(
                    { userId: req.params.user_id },
                    { $push: { productList: data } }
                  ).then((data) =>{
                    res.status(200).send("Added to Cart successfully");
                }).catch((err) =>{
                    res.status(500).send({err: err.message});
                });;
            }).catch((err) =>{
                res.status(500).send({err: err});
            })
    }else{
        res.status(500).send("User doesn't exist");
    }

};

const deleteOne = async (req, res) => {
    const user = await findUser(req.params.user_id);

    if(user.length  !== 0){
        const product =  user[0].productList.filter(x => x.productId === req.params.product_id);

        await Cart.updateOne({},
            {
              $pull: {
                productList: {
                   _id: product[0]._id,
              }
             }
            }).then(() => {
                res.status(200).send("Deleted an Item");
            }).catch((err) =>{
                res.status(500).send({err: err});
            })
    }else{
        res.status(500).send("User doesn't exist");
    }
};

const deleteAll = async (req, res) => {
    const user = await findUser(req.params.user_id);
    const id = user[0]._id;

    await Cart.findByIdAndRemove(id).exec();
    res.status(200).send("Deleted Successfully");
};

module.exports = {
    add,
    get,
    update,
    deleteOne,
    deleteAll,
}