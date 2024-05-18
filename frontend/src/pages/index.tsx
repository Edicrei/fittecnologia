
'use client'

import Link from "next/link";
import axios from 'axios'; 
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal, AwaitedReactNode, useEffect, useState, SetStateAction } from "react";

import Modal from 'react-modal';
import router from "next/router";

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    width: '50%',
    transform: 'translate(-50%, -50%)',
  },
};

export default function Home() {

  const [file, setFile] = useState();
  const [upload, setUpload] = useState(false);
  const [autor, setAutor] = useState('');
  const [created, setCreated] = useState('');
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');
  const [search, setSearch] = useState('')

  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:3001/books')
      .then((res) => {
       //console.log(res)
       setData(res.data.books)
      });
  }, []);

  let subtitle: HTMLHeadingElement | null;
  const [modalIsOpen, setIsOpen] = useState(false);

  const  openModal = () => {
    setIsOpen(true);
  }

  const afterOpenModal = () =>  {
    // references are now sync'd and can be accessed.
   // subtitle.style.color = '#000';
  }

  const closeModal= () =>  {
    setIsOpen(false);
    setUpload(false);

   
  }



  const getBook = (book)=>{
    localStorage.setItem("bookid", book);  
    return router.push('/details');
  
  }


  const uploadBook = () => {

    const formData = new FormData()
    formData.append("title", title);
    formData.append("autor", autor);
    formData.append("created", created);
    formData.append("description", description);
    formData.append('file', file)
    axios.post('http://localhost:3001/books/',formData )
    .then((response) => {
        console.log(response);
        if(response.data.Status === 'Success') {
            console.log("File Successfully Uploaded");
        }else{
          console.log("Error");
        }
    })
    .catch(er => console.log(er))
}




  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-white">
        <div className='w-3/4 m-auto'>
           <div className="mt-10">
                <div className="flex flex-row ..." >
                    <p className="mb-4 text-4xl font-bold leading-none tracking-tight text-gray-900 md:text-1xl lg:text-1xl">Livros</p>
                    <p className="mb-4 text-2xl font-bold leading-none tracking-tight text-gray-900 md:text-1xl lg:text-1xl" style={{marginLeft: 710}}   onClick={openModal}>Novo</p>
                    <Modal
                      isOpen={modalIsOpen}
                      onAfterOpen={afterOpenModal}
                      onRequestClose={closeModal}
                      style={customStyles}
                      contentLabel="Example Modal"
                    >
                      <h2  className="mb-4 text-1xl font-extrabold leading-none tracking-tight text-gray-900 md:text-1xl lg:text-1xl text-center">Novo Livro</h2>
                      <button onClick={closeModal}>x</button>
                      <form className="max-md mx-auto">

                      <div className="flex flex-row...">
                      <div >
                      <input type="text" id="title" className="block w-full p-4 ps-10 text-sm text-black-900 border border-gray-300 rounded-lg bg-black-50 focus:ring-white-500 focus:border-black-500 dark:bg-white-700 dark:border-white-600 dark:placeholder-black-400 dark:text-white dark:focus:ring-white-500 dark:focus:border-white-500 w-full" placeholder="Titulo" onChange={e => setTitle(e.target.value)}  required style={{color: '#000', width: 400}} /> <br/>
                      <input type="text" id="autor" className="block w-full p-4 ps-10 text-sm text-black-900 border border-gray-300 rounded-lg bg-black-50 focus:ring-white-500 focus:border-black-500 dark:bg-white-700 dark:border-white-600 dark:placeholder-black-400 dark:text-white dark:focus:ring-white-500 dark:focus:border-white-500 w-full" placeholder="Autor"   onChange={e => setAutor(e.target.value)}  required style={{color: '#000'}} /> <br/>
                       <input type="date"  id="date" className="block w-full p-4 ps-10 text-sm text-black-900 border border-gray-300 rounded-lg bg-black-50 focus:ring-white-500 focus:border-black-500 dark:bg-white-700 dark:border-white-600 dark:placeholder-black-400 dark:text-white dark:focus:ring-white-500 dark:focus:border-white-500 w-full" placeholder="Data de Publicação"  onChange={e => setCreated(e.target.value)}  required style={{color: '#000'}} /> <br/>
                      </div>
                                          
                      <div className="flex items-center justify-center w-full " style={{marginLeft: 25}}>
                          <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-60 border-2 border-white-300 border rounded-lg cursor-pointer bg-white-50 dark:hover:bg-white-800 dark:bg-white-700 hover:bg-white-100 dark:border-white-600 dark:hover:border-white-500 dark:hover:bg-gray-600">
                              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                  {upload ===true ? 
                                          null
                                          :

                                            <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                                              width="62.000000pt" height="61.000000pt" viewBox="0 0 62.000000 61.000000"
                                              preserveAspectRatio="xMidYMid meet">

                                              <g transform="translate(0.000000,61.000000) scale(0.100000,-0.100000)"
                                              fill="#D5D5D5" stroke="none">
                                              <path d="M39 587 c-36 -27 -39 -52 -39 -295 0 -227 1 -241 21 -266 l20 -26
                                              269 0 269 0 20 26 c20 25 21 39 21 266 0 243 -3 268 -39 295 -23 18 -519 18
                                              -542 0z m535 -39 c13 -18 16 -53 16 -177 l0 -155 -72 71 c-40 39 -83 74 -96
                                              78 -19 6 -38 -8 -118 -86 -82 -81 -97 -92 -112 -81 -53 38 -60 38 -105 -6 -24
                                              -23 -46 -42 -50 -42 -4 0 -7 84 -7 188 0 154 3 192 16 210 15 22 18 22 264 22
                                              246 0 249 0 264 -22z m-67 -300 c82 -82 83 -83 83 -133 0 -30 -6 -60 -16 -73
                                              -15 -22 -18 -22 -264 -22 -246 0 -249 0 -264 22 -25 35 -20 50 37 106 l53 53
                                              26 -21 c46 -35 67 -27 158 65 47 47 89 85 95 85 5 0 47 -37 92 -82z"/>
                                              <path d="M144 510 c-55 -22 -70 -95 -29 -135 49 -50 130 -24 141 46 10 61 -56
                                              113 -112 89z m71 -50 c15 -17 16 -24 7 -45 -14 -30 -33 -39 -67 -31 -29 7 -42
                                              45 -25 75 14 27 61 28 85 1z"/>
                                              </g>
                                              </svg>
                                    }
                                    
                                  <input id="dropzone-file" type="file" className="hidden" onChange={e => setFile(URL.createObjectURL(e.target.files[0]))} onClick={()=> setUpload(true)}/>
                                  {upload ===true ? 
                                   <img
                                    className="fit-picture"  
                                    src={file}
                                    width="150.000000pt" 
                                    height="210.000000pt" 
                                   
                                   />
                                   :
                                   null
                                  }
                             <p className="mb-2 text-sm text-gray-300 dark:text-gray-400 text-center"><span className="font-semibold">Escolher Imagem</span> </p>
                              </div>
                            
                          </label>
                      </div> 
                      </div>
                      <br/>
                      <textarea  id="description" className="block w-full p-4 ps-10 text-sm text-black-900 border border-gray-300 rounded-lg bg-black-50 focus:ring-white-500 focus:border-black-500 dark:bg-white-700 dark:border-white-600 dark:placeholder-black-400 dark:text-white dark:focus:ring-white-500 dark:focus:border-white-500 w-full" placeholder="Descrição" onChange={e => setDescription(e.target.value)} required style={{color: '#000'}} rows={4} cols={50}/>
                    
                      <div className="flex flex-row... " style={{marginLeft: 150, marginTop: 25}}>
                        <button type="button" style={{backgroundColor: '#D5D5D5', color:"#4D4D4D"}} onClick={closeModal}
                            className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 w-40">
                           Cancelar
                          </button>
                          <button type="button"  style={{backgroundColor: '#78C2EB'}} className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-40" onClick={uploadBook}>Salvar</button>
                          </div>
                        <button>tab navigation</button>
                        <button>stays</button>
                        <button>inside</button>
                        <button>the modal</button>
                      </form>
                    </Modal>
                </div>
               
              <div className="relative w-full" style={{marginTop: 25}}>
                <form className="max-md mx-auto">   
                        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                              
                            </div>
                            <input type="search" id="default-search" className="block w-full p-4  text-1xl text-black-900 border border-gray-300 rounded-lg bg-black-50 focus:ring-white-500 focus:border-black-500 dark:bg-white-700 dark:border-white-600 dark:placeholder-black-400 dark:text-white dark:focus:ring-white-500 dark:focus:border-white-500 w-full" placeholder="Buscar" onChange={e => setSearch(e.target.value)}  required style={{color: '#000'}} />
                            <button  disabled type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-white-700 hover:bg-white-800 focus:ring-4 focus:outline-none focus:ring-white-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-white-600 dark:hover:bg-white-700 dark:focus:ring-white-800" >  <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" style={{color: 'black'}}>
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                </svg>
                                </button>
                        </div>
                    </form>

                </div>
                    
                    <br/>
                   

                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4" style={{marginTop: 25}}>
                  {data.filter((book)=>{
                    if(search===''){
                      return book
                    }else if(book.title.toLowerCase().includes(search.toLowerCase())){
                     return book
                    }
                  })
                  .map((book: {
                      [x: string]: ReactNode; id: Key | null | undefined; nome: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; 
                  })=>
                  
                 
                              <div key={book.id}  className="max-w-sm rounded overflow-hidden shadow-lg w-64" onClick={() => getBook(book.id) }  >
                                
                              <div   className="max-w-sm rounded overflow-hidden shadow-lg bg-zinc-100 h-56">
                                <img
                                    class="fit-picture" 
                                    src={book.image}
                                    alt="Grapefruit slice atop a pile of other slices" 
                                    width="100"
                                    height="50"
                                    style={{marginLeft: 80, alignSelf: 'center', marginTop: 40}}
                                    
                                    />
                                    </div>
                                  <div className="px-6 py-4">
                                    <div className="font-bold text-xl mb-2"><p className="mb-4 text-1xl font-extrabold leading-none tracking-tight text-gray-900 md:text-1xl lg:text-1xl" >{book.title}</p></div>
                                    <p className="text-gray-500 text-base text-ellipsis overflow-hidden ..." style={{color: '#000'}}>
                                    {(book.description).substring(0, 285)}...
                                    </p>
                                  </div>
                            
                                </div> 
                               )}    
                  </div>
            </div>

         </div>

   
    </main>
  );
}
