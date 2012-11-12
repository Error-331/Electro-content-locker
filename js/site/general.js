var tmpContLock = null;

var usrConfig = 
  {
  LoadEvent: 'onclick',
  ElementPattern: '',

  ContentAttachment: 'normal',
	ContentHAlign: 'left',
	ContentVAlign: 'top',

	Width: 500,
  Height: 350,

	ContentWidth: 450,
	ContentHeight: 300,

	ContentPadding: 0,
	      	 
	FitBorderImage: false,
    
	OverlayImageURL: 'img/bg/bg8.gif',
  BorderImageURL: 'img/border/brd1.png',	    

	OVOpacity: 100,
	BGOpacity: 100,
   
	OVColor: '#FF7F24',
	BGColor: '#FFFFFF',	      
	      
	ContentURL: 'content.txt',
  StatusCheckURL: 'status.txt',

	ShowDelay: 0,
	CheckStatusDelay: 5000
	};

jQuery(document).ready(function()
  {    
  // Show locker button
  $('a#ShowLockBtn').button().click(function(usrEvent) 
    {
    usrEvent.preventDefault();
            
    if (tmpContLock == null)
      {
      tmpContLock = new ElectroContentLocker(usrConfig);
      }
      
    $('a#ShowLockBtn').button('disable');
    $('a#HideLockBtn').button('enable');      
    });
        
  // Hide locker button  
  $('a#HideLockBtn').button().click(function(usrEvent) 
    {
    usrEvent.preventDefault();
        
    if (tmpContLock != null)
      {
      tmpContLock.HideLocker();
      tmpContLock = null;
      }
      
    $('a#ShowLockBtn').button('enable');
    $('a#HideLockBtn').button('disable');      
    });
    
  // Demo expand/collapse button 
  $('a.DemoWidgetHeadPart2Link').click(function(usrEvent)
    {
    usrEvent.preventDefault();
    
    var tmpWindow = $(window);
    var tmpMainCont = $('.DemoWidgetContOut');
                                          
    var tmpHead = $('.DemoWidgetHead');
    var tmpLink = $(this);
    var tmpCont = $('.DemoWidgetCont');

    if (tmpLink.hasClass('ui-icon-arrowthick-1-s') == true)
      {
      tmpHead.removeClass('ui-corner-top');
      tmpHead.addClass('ui-corner-all');
      
      tmpLink.removeClass('ui-icon-arrowthick-1-s');
      tmpLink.addClass('ui-icon-arrowthick-1-n');
      
      tmpCont.css('display', 'none');
      tmpMainCont.removeClass('DemoWidgetContOutTrunc');
      tmpCont.css('height', '100%');
      }
    else
      {
      tmpHead.removeClass('ui-corner-all');
      tmpHead.addClass('ui-corner-top');
           
      tmpLink.removeClass('ui-icon-arrowthick-1-n');
      tmpLink.addClass('ui-icon-arrowthick-1-s');
      
      tmpCont.css('display', 'block'); 

      if (tmpMainCont.outerHeight(true) > tmpWindow.outerHeight(true)) 
        {
        tmpMainCont.addClass('DemoWidgetContOutTrunc');
        tmpCont.css('height', (tmpMainCont.outerHeight(true) - tmpHead.outerHeight(true)) + 'px');
        } 
      else
        {
        tmpCont.css('height', '100%');
        }    
      }     
    }); 
    
  // Widget load options
  $('#DemoWidgetLoadCont').buttonset();   
  $('#DemoWidgetLoadOpt1').click(function(usrEvent)
    { 
    usrConfig.LoadEvent = 'autoload';
    $('#DemoWidgetCSSPatOpt').val('');
    });
    
  $('#DemoWidgetLoadOpt2').click(function(usrEvent)
    { 
    usrConfig.LoadEvent = 'onclick';
    $('#DemoWidgetCSSPatOpt').val('');
    }); 
    
  $('#DemoWidgetLoadOpt3').click(function(usrEvent)
    { 
    usrConfig.LoadEvent = 'link';
    $('#DemoWidgetCSSPatOpt').val('');
    $('#DemoWidgetCSSPatOpt').trigger('change');
    });
    
  $('#DemoWidgetLoadOpt4').click(function(usrEvent)
    { 
    usrConfig.LoadEvent = 'csslink';
    $('#DemoWidgetCSSPatOpt').val('GreenLink');
    $('#DemoWidgetCSSPatOpt').trigger('change');
    });
    
  $('#DemoWidgetCSSPatOpt').change(function(usrEvent)
    { 
    usrConfig.ElementPattern = $(this).val();
    });    
    
  // Widget attachment options    
  $('#DemoWidgetAttachCont').buttonset();   
  $('#DemoWidgetAttachOpt1').click(function(usrEvent)
    { 
    usrConfig.ContentAttachment = 'normal';
    });
    
  $('#DemoWidgetAttachOpt2').click(function(usrEvent)
    { 
    usrConfig.ContentAttachment = 'floatabove';
    });  
    
  // Widget halign options
  $('#DemoWidgetHAlignCont').buttonset();   
  $('#DemoWidgetHAlignOpt1').click(function(usrEvent)
    { 
    usrConfig.ContentHAlign = 'left';
    });
    
  $('#DemoWidgetHAlignOpt2').click(function(usrEvent)
    { 
    usrConfig.ContentHAlign = 'center';
    }); 
    
  $('#DemoWidgetHAlignOpt3').click(function(usrEvent)
    { 
    usrConfig.ContentHAlign = 'right';
    });        
    
  // Widget valign options    
  $('#DemoWidgetVAlignCont').buttonset(); 
  $('#DemoWidgetVAlignOpt1').click(function(usrEvent)
    { 
    usrConfig.ContentVAlign = 'top';
    });
    
  $('#DemoWidgetVAlignOpt2').click(function(usrEvent)
    { 
    usrConfig.ContentVAlign = 'center';
    }); 
    
  $('#DemoWidgetVAlignOpt3').click(function(usrEvent)
    { 
    usrConfig.ContentVAlign = 'bottom';
    });    
      
  // Widget width option  
  $('#DemoWidgetWidthOpt').change(function(usrEvent)
    {                     
    usrConfig.Width = parseFloat($(this).val());
    }); 
    
  // Widget height option  
  $('#DemoWidgetHeightOpt').change(function(usrEvent)
    { 
    usrConfig.Height = parseFloat($(this).val());
    }); 
    
  // Widget content width option 
  $('#DemoWidgetContWidthOpt').change(function(usrEvent)
    {                     
    usrConfig.ContentWidth = parseFloat($(this).val());
    });  
    
  // Widget content height option 
  $('#DemoWidgetContHeightOpt').change(function(usrEvent)
    {                     
    usrConfig.ContentHeight = parseFloat($(this).val());
    });          
    
  // Widget content padding option  
  $('#DemoWidgetContPadOpt').change(function(usrEvent)
    {                     
    usrConfig.ContentPadding = parseFloat($(this).val());
    });      
    
  // Widget fit image option     
  $('#DemoWidgetFitImgCont').buttonset(); 
  $('#DemoWidgetFitImgOpt1').click(function(usrEvent)
    { 
    usrConfig.FitBorderImage = true;
    }); 
    
  $('#DemoWidgetFitImgOpt2').click(function(usrEvent)
    { 
    usrConfig.FitBorderImage = false;
    });           
           
  // Widget overlay image option  
  $('#DemoWidgetOvImgCont').buttonset();     
  $('#DemoWidgetOvImgOpt1').click(function(usrEvent)
    { 
    usrConfig.OverlayImageURL = 'img/bg/bg1.gif';
    });   
    
  $('#DemoWidgetOvImgOpt2').click(function(usrEvent)
    { 
    usrConfig.OverlayImageURL = 'img/bg/bg2.gif';
    });  
    
  $('#DemoWidgetOvImgOpt3').click(function(usrEvent)
    { 
    usrConfig.OverlayImageURL = 'img/bg/bg3.gif';
    });
    
  $('#DemoWidgetOvImgOpt4').click(function(usrEvent)
    { 
    usrConfig.OverlayImageURL = 'img/bg/bg4.gif';
    }); 
    
  // Widget border image option  
  $('#DemoWidgetBgImgCont').buttonset();     
  $('#DemoWidgetBgImgOpt1').click(function(usrEvent)
    { 
    usrConfig.BorderImageURL = 'img/border/brd1.png';
    });   
    
  $('#DemoWidgetBgImgOpt2').click(function(usrEvent)
    { 
    usrConfig.BorderImageURL = 'img/border/brd2.png';
    });  
    
  $('#DemoWidgetBgImgOpt3').click(function(usrEvent)
    { 
    usrConfig.BorderImageURL = 'img/border/brd3.png';
    });
    
  $('#DemoWidgetBgImgOpt4').click(function(usrEvent)
    { 
    usrConfig.BorderImageURL = 'img/border/brd4.png';
    }); 
    
  // Widget overlay opacity
  $("#DemoWidgetOvOpSpin").spinner(
    {
    min: 0,
    max: 100,
    step: 10,
    start: 100,
    
    change: function(usrEvent, usrUI)
      {
      usrConfig.OVOpacity = parseFloat($(this).val());
      },
      
    spin: function(usrEvent, usrUI)
      {
      usrConfig.OVOpacity = parseFloat(usrUI.value);
      }
    });

  // Widget border opacity
  $("#DemoWidgetBgOpSpin").spinner(
    {
    min: 0,
    max: 100,
    step: 10,
    start: 0,
    
    change: function(usrEvent, usrUI)
      {
      usrConfig.BGOpacity = parseFloat($(this).val());
      },
      
    spin: function(usrEvent, usrUI)
      {
      usrConfig.BGOpacity = parseFloat(usrUI.value);
      }
    });
         
  // Event triggering
  $('a.DemoWidgetHeadPart2Link').trigger('click');
  $('a#HideLockBtn').button('disable'); 
  $('#DemoWidgetLoadOpt1').trigger('click');     
  $('#DemoWidgetAttachOpt1').trigger('click'); 
  
  $('#DemoWidgetHAlignOpt2').trigger('click');  
  $('#DemoWidgetVAlignOpt2').trigger('click');
  
  $('#DemoWidgetWidthOpt').trigger('change');  
  $('#DemoWidgetHeightOpt').trigger('change');    
  
  $('#DemoWidgetContWidthOpt').trigger('change');  
  $('#DemoWidgetContHeightOpt').trigger('change');   
  $('#DemoWidgetContPadOpt').trigger('change');
  
  $('#DemoWidgetFitImgOpt2').trigger('click'); 
  
  $('#DemoWidgetOvImgOpt1').trigger('click'); 
  $('#DemoWidgetBgImgOpt1').trigger('click'); 
  
  $('#DemoWidgetOvOpSpin').trigger('change');
  $('#DemoWidgetBgOpSpin').trigger('change');                    
  }
);