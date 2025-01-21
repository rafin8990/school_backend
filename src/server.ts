import mongoose from 'mongoose'
import app from './app'
async function boostrap() {
  try {
    await mongoose.connect(
      'mongodb+srv://school_backend:bhCbsu7M7kYlYY6S@cluster0.nuouh7o.mongodb.net/school_backend?retryWrites=true&w=majority&appName=Cluster0'
    )
    console.log(`🛢 Database is connected successfully`)
    app.listen(5000, () => {
      console.log('application is running on port 5000')
    })
  } catch (err) {
    console.error('Failed to connect to the database:', err)
    process.exit(1)
  }
}

boostrap()
