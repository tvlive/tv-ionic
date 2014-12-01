function transform_channel(data) {
	for (i = 0; i < data.length; i++) {   
	  data[i].icon = 'http://beta.tvlive.io/' + data[i].image;
	}
	return data;
	}

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
        data[i].type = 'Series';
      }

      if (data[i].program){
        data[i].title = data[i].program.title;      
        data[i].type = 'Program';
      } 

      if (data[i].film){
        data[i].title = data[i].film.title;        
        data[i].type = 'Film';
      }

      s = new Date(data[i].start);
      e = new Date(data[i].end);    
      data[i].st = transform_minutes(s.getHours()) + ':' + transform_minutes(s.getMinutes());
      data[i].et = transform_minutes(e.getHours()) + ':' + transform_minutes(e.getMinutes());
       
    }
      return data;
  }

  function transform_date_details(data) {
      s = new Date(data.start);
      e = new Date(data.end);    
      data.st = transform_minutes(s.getHours()) + ':' + transform_minutes(s.getMinutes());
      data.et = transform_minutes(e.getHours()) + ':' + transform_minutes(e.getMinutes());
      return data;
  }