import mongoose from 'mongoose';

export const dbconnect = function (uri: string) {
  mongoose.connect(
    uri,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err: any) => {
      if (err) {
        console.log(err);
      } else {
        console.log('database connected');
      }
    }
  );
};

export default dbconnect;
