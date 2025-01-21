import mongoose from 'mongoose'
async function boostrap() {
  try {
    await mongoose.connect(
      'mongodb+srv://school_backend:bhCbsu7M7kYlYY6S@cluster0.nuouh7o.mongodb.net/school_backend?retryWrites=true&w=majority&appName=Cluster0'
    )
    console.log(`🛢 Database is connected successfully`)
   
  } catch (err) {
    console.error('Failed to connect to the database:', err)
    process.exit(1)
  }
}

boostrap()
