import React,{useEffect,useState} from 'react'
import BookCard from '../Books/BookCard';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination ,Navigation} from 'swiper/modules';
import { useFetchAllBooksQuery } from '../../redux/feaures/books/booksApi';

const categories = ["Choose a genre", "Business", "Fiction", "Horror", "Adventure"]
function Topsellers() {
    
  const [selectedCategory,setSelectedCategory]=useState(categories[0]);
     
  const {data:books=[]}=useFetchAllBooksQuery();
  
    console.log(books);
    const filterBooks=selectedCategory==="Choose a genre"?books:books.filter((book)=>(book.category===selectedCategory.toLowerCase()));
    const handleCategoryChange=(e)=>{
        setSelectedCategory(e.target.value);
    }
  return (
    <div className='py-10'>
        <h2 className='text-3xl font-semibold mb-6'>Top Sellers</h2>
        <div className='mb-8 flex items-center'>
            <select 
            onChange={(e)=>setSelectedCategory(e.target.value)}
            // value={selectedCategory}
             name='category' id='category' className='border bg-[#EAEAEA] border-gray-300 rounded-md px-4 py-2 focus:outline-none'>
                {categories.map((category,index)=>(
                    <option value={category} key={index}>{category}</option>
                ))}
            </select>
        </div>
        <Swiper
         navigation={true}
        slidesPerView={1}
        spaceBetween={20}
        // pagination={{
        //   clickable: true,
        // }}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
        }}
        modules={[Pagination,Navigation]}
        className="mySwiper"
      > 
         {
            filterBooks.length>0 && filterBooks.map((book,index)=>(
               <SwiperSlide><BookCard key={index} book={book} /></SwiperSlide>
                // <div>{book.title}</div>
            ))
        }
      </Swiper>
       
    </div>
  )
}

export default Topsellers