


document.addEventListener('DOMContentLoaded', () => {

  const URL = 'https://minions-api.herokuapp.com/characters'

  const renderCharacters = ()=>{
    axios.get(URL)
      .then((result)=>{
        // console.log(result.data)
        document.getElementById('all-characters').innerText = ''
        result.data.forEach((character)=>{
          const li = document.createElement('li')
          li.innerText = character.name
          document.getElementById('all-characters').append(li)
        })
      })
      .catch((err)=>{
        console.log(err)
      })    
  }

  document.getElementById('search-character-button').addEventListener('click', ()=>{

    const id = document.getElementById('search-character-input').value

    axios.get(`${URL}/${id}`)
      .then((result)=>{
        const character = result.data

        // document.getElementById('search-character-div').innerText = ''
        // const p = document.createElement('p')
        // p.innerText = character.name
        // document.getElementById('search-character-div').append(p)
        document.getElementById('search-character-div').innerHTML = `<p>Name: ${character.name}</p>`
      })
      .catch((err)=>{
        console.log(err)
      })
  })

  document.getElementById('create-character-button').addEventListener('click', ()=>{

    const name = document.getElementById('name').value
    const occupation = document.getElementById('occupation').value
    const cartoon = document.getElementById('cartoon').value
    const weapon = document.getElementById('weapon').value

    axios.post(URL, {name, occupation, cartoon, weapon})
      .then((result)=>{

        const createdCharacter = result.data

        const p = document.createElement('p')
        p.innerText = createdCharacter.name
        document.getElementById('create-character-div').append(p)

        renderCharacters()
      })
      .catch((err)=>{
        console.log(err)
      })
  })

  document.getElementById('edit-character-button').addEventListener('click', ()=>{

    const name = document.getElementById('name').value
    const occupation = document.getElementById('occupation').value
    const cartoon = document.getElementById('cartoon').value
    const weapon = document.getElementById('weapon').value
    const id = document.getElementById('edit-character-id').value

    axios.put(`${URL}/${id}`, {name, occupation, cartoon, weapon})
      .then((result)=>{
        renderCharacters()
      })
      .catch((err)=>{
        console.log(err)
      })
  })

  renderCharacters()
  
  
}, false);


