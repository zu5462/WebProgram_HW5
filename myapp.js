var skycons = new Skycons();
  skycons.play();

  var weatherCode=[   '臺北市',
                      '新北市',
                      '台中市',
                      '臺南市',
                      '高雄市',
                      '基隆市',
                      '桃園市',
                      '新竹市',
                      '新竹縣',
                      '苗栗縣',
                      '彰化縣',
                      '南投縣',
                      '雲林縣',
                      '嘉義市',
                      '嘉義縣',
                      '屏東縣',
                      '宜蘭縣',
                      '花蓮縣',
                      '台東縣',
                      '澎湖縣',
                      '金門縣',
                      '連江縣',
                  ],
    day =["today","day1","day2","day3"],
    NowCity = weatherCode[0];

var addlist = function(){
  $('.btn').text(NowCity);
  $('li').remove();
  for(var i=0;i<weatherCode.length;i+=1){
  $('<li role="presentation" id="weatherCode'+i+'"><a role="menuitem" tabindex="-1" href="#">'+weatherCode[i]+'</a></li>').appendTo('#dropdown');
  }
  $('#dropdown').css({'height':'70vh','overflow-y':'scroll'});
};

var changeCity =function(){
  $('#dropdown li').on('click', function(){
      for(var i=0;i<weatherCode.length;i+=1){
        if($(this).text()===weatherCode[i]){
          if($(this).text()==='桃園市'){
            NowCity='桃園區';
          }else{
            NowCity = weatherCode[i];
          } 
        $('.btn').text(weatherCode[i]);
        GetWeatherInfo();
          }
        }
  });
};

var GetWeatherInfo = function(){
  $.ajax('https://query.yahooapis.com/v1/public/yql', { 
       method: 'GET', 
       data: { 
         q: 'select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="'+NowCity+'") and u="c"', 
         format: 'json' 
       }, 
       success: function (data) { 
         var weatherInfo = data.query.results.channel.item,
             weatherDate =
         [Today = {date :      weatherInfo.forecast[0].date,
                   temp :      weatherInfo.condition.temp,
                   code :      weatherInfo.forecast[0].code,
                   text :      weatherInfo.forecast[0].text},
 
         day_1 = { date :      weatherInfo.forecast[1].date,
                   low  :      weatherInfo.forecast[1].low,
                   high :      weatherInfo.forecast[1].high,
                   code :      weatherInfo.forecast[1].code,
                   text :      weatherInfo.forecast[1].text},


         day_2 = { date :      weatherInfo.forecast[2].date,
                   low  :      weatherInfo.forecast[2].low,
                   high :      weatherInfo.forecast[2].high,
                   code :      weatherInfo.forecast[2].code,
                   text :      weatherInfo.forecast[2].text},

         day_3 = { date :      weatherInfo.forecast[3].date,
                   low  :      weatherInfo.forecast[3].low,
                   high :      weatherInfo.forecast[3].high,
                   code :      weatherInfo.forecast[3].code,
                   text :      weatherInfo.forecast[3].text}],

        Weatherchange = function(){
          $('.panel').slideUp('slow');
          $('.date,.temperature,.panel,#today').hide();

          $('.condition').html('<span class="date">'+Today.date+'</span> :'+Today.text);
          $('.temperature').text(Today.temp);

          $('#day1_date').text(day_1.date);
          $('#day1_temp').text(day_1.low+"-"+day_1.high+" ℃");

          $('#day2_date').text(day_2.date);
          $('#day2_temp').text(day_2.low+"-"+day_2.high+" ℃");
          
          $('#day3_date').text(day_3.date);
          $('#day3_temp').text(day_3.low+"-"+day_3.high+" ℃");

          $('.date,.temperature,#today').fadeIn('1000');
          $('.panel').slideDown('slow');
          },

        ChangeIcon = function(){
        for(var i=0;i<day.length;i+=1){
          var code = weatherDate[i].code;
          switch(code){
            case'32':
            case'34':
            skycons.set(day[i], Skycons.CLEAR_DAY);
            break;
            case'31':
            case'33':
            skycons.set(day[i], Skycons.CLEAR_NIGHT);
            break;
            case'28':
            case'30':
            case'44':
            skycons.set(day[i], Skycons.PARTLY_CLOUDY_DAY);
            break;
            case'27':
            case'29':
            skycons.set(day[i], Skycons.PARTLY_CLOUDY_NIGHT);
            break;
            case'26':
            skycons.set(day[i], Skycons.CLOUDY);
            break;
            case'1':
            case'2':
            case'3':
            case'4':
            case'8':
            case'9':
            case'10':
            case'11':
            case'12':
            case'37':
            case'38':
            case'39':
            case'40':
            case'45':
            case'47':
            skycons.set(day[i], Skycons.RAIN);
            break;
            case'6':
            case'18':
            skycons.set(day[i], Skycons.SLEET);
            break;
            case'5':
            case'7':
            case'13':
            case'16':
            case'41':
            case'43':
            skycons.set(day[i], Skycons.SNOW);
            break;
            case'23':
            case'24':
            skycons.set(day[i], Skycons.WIND);
            break;
            case'19':
            case'20':
            case'21':
            skycons.set(day[i], Skycons.FOG);
            break;
            default:
            break;
                }
              }
            };
      Weatherchange();
      ChangeIcon();
        }
      }); 
};
  $(document).ready(function(){ 
    GetWeatherInfo();
    addlist();
    changeCity();
  });
