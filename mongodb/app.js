  const uri = "mongodb://localhost:27017"

const {MongoClient} =  require("mongodb");

async function main(){

  // const uri = "mongodb+srv://kasinathansj:kasi%40home61@cluster0.gumlfqd.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri);
  try{
  await client.connect();

  // await listDBS(client)
  await insertOne(client,{_id:"teacher1@psnacet.edu.in",name:"teacher1",department:"BE/CSE",class:[]});
  // await insertMany(client,[{name:"scale" , price:4},{name:"eraser" , price:2}]);
  // await findOne(client,{_id:921321104093});
  // await findMany(client,"pen");
  // await updateOne(client,"pen",10);
  // await updateMany(client);
  // await deleteOne(client,"pen")
  // await deleteMany(client)
  }catch(e){
    console.log(e);
  }finally{
    await client.close();
  }
}
main().catch(console.error);

async function listDBS(client){
  const list = await client.db().admin().listDatabases();
  list.databases.forEach(element => {
    console.log(element);
  });
}

async function insertOne(client , data){
  const results = await client.db("kasi").collection("TEACHERSDETAILS").insertOne(data);
  console.log(results);
}

async function insertMany(client , datas){
  const results = await client.db("kasi").collection("product").insertMany(datas);
  console.log(results);
}

async function findOne(client, name){
  const result = await client.db("kasi").collection("STUDENTSDETAILS").findOne(name);
  console.log(result)
}

async function findMany(client, name){
  const cursor = await client.db("kasi").collection("product").find({name});
  const results = await cursor.toArray();

    if (results.length > 0) {
        results.forEach((result, i) => {
            console.log();
            console.log(`${i + 1}. name: ${result.name}`);
        });
    } else {
    }
}

async function updateOne(client,name,price){
  //can also use upsert => create if not exist
  const cursor = await client.db("kasi").collection("product").updateOne(
    {name:name},
    {$set:{price:price}},
    // {upsert : true}
    );
  console.log(cursor);
}

async function updateMany(client){
  //can also use upsert => create if not exist
  const cursor = await client.db("kasi").collection("product").updateMany(
    {stock:{$exists:false}},
    {$set:{stock:0}},
    // {upsert : true}
    );
  console.log(cursor);
}

async function deleteOne(client,name){
  const cursor = await client.db("kasi").collection("product").deleteOne(
    {name:name},
    );
  console.log(cursor);
}

async function deleteMany(client){
  const cursor = await client.db("kasi").collection("product").deleteMany(
    {stock:{$exists:false}},
    );
  console.log(cursor);
}
