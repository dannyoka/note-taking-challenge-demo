const { Router } = require('express');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const router = Router();

router.get('/', (req, res) => {
  fs.readFile('./db/db.json', 'utf-8', (err, data) => {
    if (err) {
      console.log(err);
      res.status(400).send('There was an error!');
    } else {
      console.log(JSON.parse(data));
      res.json(JSON.parse(data));
    }
  });
});

router.post('/', (req, res) => {
  const { title, text } = req.body;
  fs.readFile('./db/db.json', 'utf-8', (err, data) => {
    if (err) {
      console.log(err);
    } else {
      const oldData = JSON.parse(data);
      oldData.push({ title, text, id: uuidv4() });
      fs.writeFile(
        './db/db.json',
        JSON.stringify(oldData),
        'utf-8',
        (error) => {
          if (error) {
            console.log(error);
          }
        }
      );
    }
  });
  res.send('Got your notes!');
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  console.log(id);
  fs.readFile('./db/db.json', 'utf-8', (err, data) => {
    if (err) {
      console.log(err);
      res.send('There was a problem deleting your data');
    } else {
      const oldData = JSON.parse(data);
      const newData = oldData.filter((todo) => todo.id !== id);
      fs.writeFile(
        './db/db.json',
        JSON.stringify(newData),
        'utf-8',
        (error) => {
          if (error) console.log(error);
          res.send('Deleted successfully');
        }
      );
    }
  });
});

module.exports = router;
