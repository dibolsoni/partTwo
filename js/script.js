/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


/* 
make studentsList as all 'li' from the page
*/
const studentsList = document.querySelectorAll('li');



/*** 
shows 10 elements from the list per page
***/
const showPage = (list, page) => {
   const first = page * 10;
   const last = Math.ceil(page + 1) * 10 - 1;
   for (let i = 0; i < list.length; i++) {
      if (i >= first && i <= last ) {
         list[i].style.display = 'contents';
      } else {
         list[i].style.display = 'none';
      }
      

   }
}
showPage(studentsList,0);

/*** 
generates the page links
***/
const appendPageLinks = (list) => {
   const totalPages = Math.ceil(list.length / 10);
  
   let pageDiv = document.querySelector('.page');
   let paginDiv = document.querySelector('.pagination');
   let ul;
   let div;
   let li;
   
   if (paginDiv) {
      div = paginDiv;
      ul = document.querySelector('.pagination ul');
      li = document.querySelectorAll('.pagination li');
      li.forEach(item => {
         ul.removeChild(item);
      });
      div.removeChild(ul); 
   } else {
      div = document.createElement('div');
      div.className = 'pagination';
      ul = document.createElement('ul');
   };   
   for (let i = 0; i < totalPages; i++) {
      li = document.createElement('li');
      const a = document.createElement('a');
      a.href = '#';
      a.textContent = i + 1 ;
      li.appendChild(a);
      ul.appendChild(li);
      if (i === 0) {
         a.className = 'active';
      }
      a.addEventListener('click', (e) => {
         document.querySelectorAll('.pagination a').forEach(item => {
            item.className = '';
         });
         e.target.className = 'active';
         showPage(list,i);
         });
   };
   div.appendChild(ul);
   pageDiv.appendChild(div);
   };
   






/* 
search funcionability
on key up search student and return the content to the page
*/

const makeSearchInput = () => {
   const headerDiv = document.querySelector('.page-header');
   const div = document.createElement('div');
   div.className = 'student-search';
   const input = document.createElement('input');
   input.placeholder = 'Search for students...';
   headerDiv.appendChild(div);
   div.appendChild(input);

}

const makeErrorMsg = (text) => {
   let h3 = document.createElement('h3');
   h3.textContent = text;
   let li = document.createElement('li');
   li.className = 'student-item cf'
   li.id = 'error';
   li.style.color = 'red';
   li.style.display = 'none';
   li.style.textAlign = 'right';
   li.appendChild(h3);
   let ul = document.querySelector('.student-list');
   ul.appendChild(li);
}

const searchStudent = () => { 
   makeSearchInput();  
   makeErrorMsg('Error 404 - Student not found. Try again!');

   const name = document.querySelectorAll('.student-details h3');
   const input = document.querySelector('.student-search input');
   input.value = '';
   let result = [];
   let search;
   input.addEventListener('keyup', (e) => {
      if (search != input.value) {
         for (let i = 0; i < studentsList.length; i++) {
            studentsList[i].style.display = 'none' 
            if ( name[i].textContent.includes(input.value) ) {
               result.push(studentsList[i]);
               studentsList[i].style.display = 'contents' 
            };
         };
         search = input.value;
      };

      let error = document.querySelector('#error');
      if (result.length > 0 || input.value.length === 0) {
         error.style.display = 'none';
         showPage(result, 0);
      } else {
         error.style.display = 'contents';
      }
      appendPageLinks(result);
      result = [];
   });


   
}
searchStudent();

appendPageLinks(studentsList);
// Remember to delete the comments that came with this file, and replace them with your own code comments.