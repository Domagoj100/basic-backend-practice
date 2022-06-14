let express = require('express');
let cors = require('cors');
const PORT = 3001;
const app = express();

app.use(cors())
app.use(express.json())

// To test if server was running ok. 
app.get('/', (request, response)=>{
    response.json('Pinging back.')
})
app.get('/api/persons', (request, response) =>{
    response.json(phonebook)
})
app.get('/info', (request, response)=>{
    let date = new Date();
    response.send(`Phonebook bas info for ${phonebook.length} people.
    ${date}`)
})
// 3.3
app.get('/api/persons/:id', (request, response)=>{
  const id = Number(request.params.id)
  const contact = phonebook.find( ele => ele.id === id)
  if(contact){
    response.send(contact)
  }else{
    response.status(404).send(`Id ${id} not found.`)
  }
})

// generate Id used in new entry 
function generateId(){
  return phonebook.length > 0 ? Math.max( ...phonebook.map(ele => ele.id)) +1 : 0
}

app.post('/api/persons', (request, response)=>{
  let reqBody = request.body;
  if(!reqBody.name || !reqBody.number){
    response.send('Error: missing name and/or number')
  }else if(phonebook.find(ele => ele.name == reqBody.name)){
    response.send('Error, name already exists in phonebook.')
  } else {

      let entry = {
        'id': generateId(),
        'name': reqBody.name,
        'number': reqBody.number
      }
      phonebook.push(entry)
      response.json(phonebook)
    }
  })

app.delete('/api/persons/delete/:id', (request, response)=>{
  const id = Number(request.params.id)
  phonebook = phonebook.filter( ele => ele.id !== id)
  response.status(204).end()
})

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})

let phonebook = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]