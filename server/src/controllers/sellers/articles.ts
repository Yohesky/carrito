import {Request, Response} from "express"
import Article, {IArticle} from "../../models/sellers/articles"
import path from "path"
import fs from "fs-extra"

export async function getAll(req: Request, res: Response){
    const allArticles = await Article.find()
    return res.json(allArticles)
    console.log(req.user);
    
}

export async function saveArticicle(req: Request, res: Response) {
     
     const {titulo, descripcionArticulo, precio, cantidad} = req.body
     const article = {titulo,descripcionArticulo, cantidad, precio, foto: req.file.path}
     const newArticle: IArticle = new Article(article)
     newArticle.idSeller = req.user
     newArticle.pedidos = 1;

    const savedArticle = await newArticle.save()
    

    return res.json({msg: 'Producto guardado correctamente', savedArticle})
}

export async function updateArticle(req: Request, res: Response) {
    const {id} = req.params
    const {titulo, descripcionArticulo, precio} = req.body
  
    
    const articleUpdated = await Article.findByIdAndUpdate(id, {
        titulo,descripcionArticulo, precio, foto: req.file.path
    })
    return res.json(articleUpdated)
    
}

export async function getOne(req: Request, res: Response){
    const {id} = req.params
    const article = await Article.findById(id)
    return res.json(article)
}

export async function deleteArticle(req: Request, res: Response){
    const {id} = req.params
    const article = await Article.findByIdAndDelete(id)

    const articles = await Article.find()
    return res.json(articles)
}

export async function myArticles(req:Request, res: Response){
    const id = req.user
    const myArticles = await Article.find({idSeller: id})
    return res.json(myArticles)
}