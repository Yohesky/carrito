import dotenv from "dotenv"
dotenv.config()
import index from './index'


function main(){
    index.listen(index.get("port"))
    console.log("running at", index.get("port"));
}

main()
