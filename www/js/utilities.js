function transform_minutes(minutes){
    if (minutes < 10) {
      return '0' + minutes
    }
    return minutes.toString();  
  }

function transform_list_tv_content(data) {
    for (i = 0; i < data.length; i++) {
      if (data[i].series){
        data[i].title = data[i].series.serieTitle;  
        data[i].rating = data[i].rating;         
        data[i].poster = data[i].series.poster;  
        data[i].type = 'Series';
      }

      if (data[i].program){
        data[i].title = data[i].program.title;  
        data[i].type = 'Program';
      } 

      if (data[i].film){
        data[i].title = data[i].film.title;   
        data[i].rating = data[i].rating;      
        data[i].poster = data[i].film.poster;  
        data[i].type = 'Film';
      }

      s = new Date(data[i].start);
      e = new Date(data[i].end);    
      s.setUTCHours(s.getUTCHours());
      e.setUTCHours(e.getUTCHours());
      data[i].st = transform_minutes(s.getHours()) + ':' + transform_minutes(s.getMinutes());
      data[i].et = transform_minutes(e.getHours()) + ':' + transform_minutes(e.getMinutes());
      data[i].passed = e < new Date();
       
    }
      return data;
  }

  function transform_date_details(data) {
      s = new Date(data.start);
      e = new Date(data.end);
      s.setUTCHours(s.getUTCHours());
      e.setUTCHours(e.getUTCHours());
      data.st = transform_minutes(s.getHours()) + ':' + transform_minutes(s.getMinutes());
      data.et = transform_minutes(e.getHours()) + ':' + transform_minutes(e.getMinutes());      

      return data;
  }

  function scroll_to(data) {
    for (i = 0; i < data.length; i++) {
      if (!data[i].passed) {
          console.log("passed:" + i)
          if (i > 0) 
            return i - 1;
          else
            return 0;          
      }
    }
    return 0;
  }

  function build_type(type_content) {
    if (type_content == 'series') {
      return 'series';
     } else if (type_content == 'film') {
      return 'films';
    } else return 'programs';    
  }

  function build_title_current(type_content) {
    if (type_content == 'series') {
      return 'Series';
     } else if (type_content == 'film') {
      return 'Films';
    } else return 'Programs';    
  }  