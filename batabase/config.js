const mongoose =  require ('mongoose');


const dbConennection = async () => {

    try {
        
    await mongoose.connect('mongodb+srv://user_tucucina:wmGJiX1ZBTOZvJx9@tucucina.qy0ap.mongodb.net/tucucina', { 

        useNewUrlParser: true,
        useUnifiedTopology: true

        // user: process.env.MONGOUSER,
        // pass: process.env.MONGOPASS,
        // dbName: process.env.MONGODATABASE

    });

    console.log('Base de datos online');
    
        
    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la base de datos');
        
    }


}


module.exports = {
    dbConennection
}