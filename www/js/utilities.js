function transform_channel(data) {
	for (i = 0; i < data.length; i++) {   
	  name = data[i].name.replace(/ /g,"_");
	  data[i].icon = 'http://beta.tvlive.io/' + name + '.png';
	}
	return data;
	}

function transform_minutes_beta(minutes){
    if (minutes == 0) {
      return '00'
    }
    return minutes.toString();  
  }

function transform_beta(data) {
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
      now = new Date();
      if (s < now && now < e) {
        data[i].now = 1;
      } else {
        data[i].now = 0;
      }
      
      data[i].st = transform_minutes_beta(s.getHours()) + ':' + transform_minutes_beta(s.getMinutes());
      data[i].et = transform_minutes_beta(e.getHours()) + ':' + transform_minutes_beta(e.getMinutes());
       
    }
      return data;
  }

  function transform_date_details(data) {
      s = new Date(data.start);
      e = new Date(data.end);    
      data.st = transform_minutes_beta(s.getHours()) + ':' + transform_minutes_beta(s.getMinutes());
      data.et = transform_minutes_beta(e.getHours()) + ':' + transform_minutes_beta(e.getMinutes());
      return data;
  }