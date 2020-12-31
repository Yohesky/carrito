import {Request, Response} from "express";
import Purchases from "../../models/users/purchases/buyArticle"
import Articles, { IArticle } from "../../models/sellers/articles"

export async function buyArticles(req: Request, res: Response) {
    const {id} = req.params
    const idUser = req.user

    const payload = {idArticle: id, idUser}

     const purchase = new Purchases(payload)
     const savedPurchase = await purchase.save()
     return res.json({msg: 'Producto agregado satisfactoriamente', savedPurchase})
    
}

export async function myCar(req:Request, res:Response) {
        const iduser = req.user
        const myArticles = await Purchases.find({idUser: iduser})
    
        
        const products = await Articles.find()
     
        var dataArray: any[] = []
        var objeto: any = {}
        var withId: any[] = []

        
        
        console.log(iduser);
        
        
        myArticles.forEach(payload => {
            products.forEach(payload2 => {
                if(payload.idArticle === payload2.id){
                    dataArray.push(payload2)
                }
            })
        })

        myArticles.forEach(payload => {
            products.forEach(payload2 => {
                if(payload.idArticle === payload2.id){
                    withId.push(payload)
                }
            })
        })

      

        return res.json({withId, dataArray})
        
        //const articles = await Articles.findById()
}

export async function deleteBuy(req:Request, res: Response){
    const {id} = req.params
    const deleteBuy = await Purchases.remove({_id: id})

    const all = await Purchases.find()

    return res.json(all)
}