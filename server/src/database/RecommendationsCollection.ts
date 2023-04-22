import { MongoClient, ServerApiVersion, Document as Doc, Collection } from "mongodb";
import { config } from "dotenv";

config();
const uri = process.env.DB_PROFILE_COLLECTION || "mongodb://mongodb0.example.com:27017"

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

let connected = false;

const connect = async (): Promise<Collection<Doc>> => {
    if (!connected) {
        await client.connect();
        connected = true;
    }
    return client.db('YouTube-WatchParty').collection('Recommendations');
};

export default connect;