/**
 * Electro content locker
 * 
 * NOTICE OF LICENSE 
 * 
 * This source file is subject to the GNU GENERAL PUBLIC LICENSE (Version 3)
 * that is bundled with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * http://www.gnu.org/licenses/gpl.html
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to red331@mail.ru so we can send you a copy immediately.    
 * 
 * @package     Chassis
 * @author      Selihov Sergei Stanislavovich <red331@mail.ru> 
 * @copyright   Copyright (c) 2012-2013 Selihov Sergei Stanislavovich.
 * @license     http://www.gnu.org/licenses/gpl.html  GNU GENERAL PUBLIC LICENSE (Version 3)
 *    
 */

/**
 * Constructor function.
 * 
 * Function that prepares current object.
 * 
 * @access public  
 * 
 * @param object usrConfig object configurator   
 *                        
 */ 
                 
ElectroContentLocker = function(usrConfig)
    {
    this.CSSPrefix = this.GenRandString(5); 
  
    if (typeof usrConfig == 'object') {this.ConfigureLocker(usrConfig);}
    this.Init();
    }
   
/* Utility properties starts here */ 

/**
 * @access public
 * @var int id that was returned from the setInterval() function, used to check whether document was loaded or not
 */ 
  
ElectroContentLocker.prototype.InitTimeout = null; 

/**
 * @access public
 * @var int id that was returned from the setInterval() function, used to initiate blocker protection mechanism
 */ 
  
ElectroContentLocker.prototype.ProtectTimeout = null; 

/**
 * @access public
 * @var int id that was returned from the setInterval() function, used to delay showing of the locker 
 */ 

ElectroContentLocker.prototype.ShowDelayTimeout = null; 

/**
 * @access public
 * @var int id that was returned from the setInterval() function, used to delay of status checking 
 */ 

ElectroContentLocker.prototype.CheckStatusTimeout = null; 

/**
 * @access public
 * @var bool indicates whether to use blocker protection (from being forcibly closed and other circumstances)
 */ 

ElectroContentLocker.prototype.BlockerProtection = true; 

/**
 * @access public
 * @var bool indicates whether content blocker was loaded or not
 */

ElectroContentLocker.prototype.IsLoaded = false;

/**
 * @access public
 * @var bool property that indicates whether browser uses quirks mode or not
 */

ElectroContentLocker.prototype.IsQuirks = false;

/**
 * @access public
 * @var bool property that indicates whether browser is Internet explorer or not
 */

ElectroContentLocker.prototype.IsIE = false;

/**
 * @access public
 * @var string CSS class prefix
 */
              
ElectroContentLocker.prototype.CSSPrefix = null;

/**
 * @access public
 * @var string last prefix of id of script tag that was used for JSONP requests (RequestContent)
 */

ElectroContentLocker.prototype.LastJSONPPrefixRecCont = null;

/**
 * @access public
 * @var string last prefix of id of script tag that was used for JSONP requests (CheckStatus)
 */

ElectroContentLocker.prototype.LastJSONPPrefixCkStat = null;

/**
 * @access public
 * @var string client language
 */ 
 
ElectroContentLocker.prototype.Lang = navigator.language ? navigator.language : navigator.browserLanguage; 

/**
 * @access public
 * @var string client location URL
 */
 
ElectroContentLocker.prototype.URL = window.location.href;

/**
 * @access public
 * @var string referrer URL
 */
 
ElectroContentLocker.prototype.Referrer = document.referrer;

/**
 * @access public
 * @var int|float width of the container where the content locker will resides
 */ 
 
ElectroContentLocker.prototype.ContWidth = 0;

/**
 * @access public
 * @var int|float height of the container where the content locker will resides
 */
 
ElectroContentLocker.prototype.ContHeight = 0;

/* Utility properties ends here */  

/* Properties containing document nodes starts here */

/**
 * @access public
 * @var object content locker overlay document node
 */

ElectroContentLocker.prototype.Overlay = null;

/**
 * @access public
 * @var object content locker background container document node
 */

ElectroContentLocker.prototype.BGCont = null;

/**
 * @access public
 * @var object content locker outer container node
 */

ElectroContentLocker.prototype.BlockerContOut = null;

/**
 * @access public
 * @var object content locker inner container node
 */

ElectroContentLocker.prototype.BlockerContIn = null;

/**
 * @access public
 * @var object content locker transparent container node
 */

ElectroContentLocker.prototype.BlockerBGCont = null;

/**
 * @access public
 * @var object content locker transparent border container node
 */

ElectroContentLocker.prototype.BlockerBorderCont = null;

/**
 * @access public
 * @var object content locker transparent border image container node
 */

ElectroContentLocker.prototype.BlockerBorderImg = null;

/**
 * @access public
 * @var object content locker text container node
 */

ElectroContentLocker.prototype.BlockerTextCont = null;

/**
 * @access public
 * @var object content locker content container node
 */

ElectroContentLocker.prototype.BlockerContentCont = null;

/* Properties containing document nodes ends here */

/* User defined properties starts here */

/**
 * @access public
 * @var string indicates on which event blocker will be shown ('autoload' - blocker will be shown instantly, 'onclick' - blocker will be shown when user clicks anywhere on the page, 'link' - blocker will be shown when user clicks any link or link with spcific URL pattern, 'csslink' - blocker will be shown when user clicks a link with specific css class pattern)
 */ 
  
ElectroContentLocker.prototype.LoadEvent = 'autoload'; 

/**
 * @access public
 * @var string pattern that is used in conjunction with this.LoadEvent
 */ 

ElectroContentLocker.prototype.ElementPattern = null; 

/**
 * @access public
 * @var string parameter that indicates how text container will behave (possible values: 'normal', 'floatabove')
 */ 

ElectroContentLocker.prototype.ContentAttachment = 'floatabove'; 

/**
 * @access public
 * @var string horizontal align of the content container (possible values: 'left', 'center', 'right')
 */ 

ElectroContentLocker.prototype.ContentHAlign = 'left';

/**
 * @access public
 * @var string vertical align of the content container (possible values: 'top', 'center', 'bottom')
 */ 

ElectroContentLocker.prototype.ContentVAlign = 'top';

/**
 * @access public
 * @var int|float locker width specified by the user
 */

ElectroContentLocker.prototype.UserWidth = null;

/**
 * @access public
 * @var int|float locker height specified by the user
 */

ElectroContentLocker.prototype.UserHeight = null;

/**
 * @access public
 * @var int|float locker content width specified by the user
 */

ElectroContentLocker.prototype.UserContentWidth = null;

/**
 * @access public
 * @var int|float locker content height specified by the user
 */

ElectroContentLocker.prototype.UserContentHeight = null; 

/**
 * @access public
 * @var int|float padding of the content locker text container node
 */

ElectroContentLocker.prototype.BlockerTextContPadding = 0;

/**
 * @access public
 * @var bool property that indicates whenever content blocker width and height must fit the blocker border image
 */

ElectroContentLocker.prototype.FitBorderImage = true;

/**
 * @access public
 * @var string URL for overlay image of the content locker
 */

ElectroContentLocker.prototype.BlockerOverlayImgURL = null;

/**
 * @access public
 * @var string URL for border image of the content locker
 */

ElectroContentLocker.prototype.BlockerBorderImgURL = null;

/**
 * @access public
 * @var int overlay opacity
 */

ElectroContentLocker.prototype.OVOpacity = 100;

/**
 * @access public
 * @var int background opacity
 */

ElectroContentLocker.prototype.BGOpacity = 100;

/**
 * @access public
 * @var string content locker overlay color
 */

ElectroContentLocker.prototype.OVColor = '#000000';

/**
 * @access public
 * @var string content locker background color
 */

ElectroContentLocker.prototype.BGColor = '#FFFFFF';

/**
 * @access public
 * @var string URL from which content for content locker will be loaded
 */

ElectroContentLocker.prototype.ContentURL = '';

/**
 * @access public
 * @var string URL which will be used get locker status from the remote server
 */

ElectroContentLocker.prototype.StatusCheckURL = '';

/**
 * @access public
 * @var string locker content buffer
 */

ElectroContentLocker.prototype.ContentBuffer = null;

/**
 * @access public
 * @var int amount of milliseconds before content locker will be shown
 */ 

ElectroContentLocker.prototype.ShowDelay = null; 

/**
 * @access public
 * @var int amount of milliseconds before each status check
 */ 

ElectroContentLocker.prototype.CheckStatusDelay = null; 

/* User defined properties ends here */
   
/* Core methods starts here */

/**
 * Method that generates random string for use in css classes names.
 * 
 * Simple method that generates random string for use in css classes names.
 * 
 * @access public   
 *
 * @param int usrLength length of the string
 * @param string usrCur current string for internal use only
 * 
 * @return string random string
 *                         
 */ 

ElectroContentLocker.prototype.GenRandString = function(usrLength, usrCur)
    {
    usrCur = usrCur ? usrCur : '';
    return usrLength ? this.GenRandString(--usrLength, "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz".charAt(Math.floor(Math.random() * 60)) + usrCur) : usrCur;
    }
  
/**
 * Method that initializes content locker object.
 * 
 * Simple method that initializes content locker object.
 * 
 * @access public    
 *                        
 */ 

ElectroContentLocker.prototype.Init = function()
    {
    var tmpSelf = this;
    this.InitTimeout = setInterval(function(){tmpSelf.CheckDocumentLoad();}, 1000);
    }  
  
/**
 * Method that checks whether document body was loaded or not.
 * 
 * Simple method that checks whether document body was loaded or not.
 * 
 * @access public    
 *   
 * @return bool true if the document body was successfully loaded and false if not                 
 */ 

ElectroContentLocker.prototype.CheckDocumentLoad = function()
    {
    if (document.body != undefined) 
        {
        return this.onBodyLoad();
        }
    else
        {
        return false;
        }  
    }  

/**
 * Method that sets configure parameters after the document body loads.
 * 
 * Simple method that sets configure parameters after the document body loads.
 * 
 * @access public   
 *
 * @param object usrConfig configurator object
 *                         
 */ 

ElectroContentLocker.prototype.ConfigureLocker = function(usrConfig)
    {  
    this.SetLoadEvent(usrConfig.LoadEvent);
    this.SetElementPattern(usrConfig.ElementPattern);
  
    this.SetContentAttachment(usrConfig.ContentAttachment);
    this.SetContentHAlign(usrConfig.ContentHAlign);
    this.SetContentVAlign(usrConfig.ContentVAlign);
  
    this.SetWidth(usrConfig.Width);
    this.SetHeight(usrConfig.Height);
  
    this.SetContentWidth(usrConfig.ContentWidth);
    this.SetContentHeight(usrConfig.ContentHeight);
     
    this.SetBlockerTextContPadding(usrConfig.ContentPadding);
  
    this.SetFitBorderImage(usrConfig.FitBorderImage);
 
    this.SetBlockerOverlayImgURL(usrConfig.OverlayImageURL);
    this.SetBlockerBorderImgURL(usrConfig.BorderImageURL);

    this.SetOVOpacity(usrConfig.OVOpacity);
    this.SetBGOpacity(usrConfig.BGOpacity);
  
    this.SetOVColor(usrConfig.OVColor);
    this.SetBGColor(usrConfig.BGColor);

    this.SetContentURL(usrConfig.ContentURL);
    this.SetStatusCheckURL(usrConfig.StatusCheckURL);
  
    this.SetShowDelay(usrConfig.ShowDelay);
    this.SetCheckStatusDelay(usrConfig.CheckStatusDelay);  
    }

/**
 * Method that renders content locker.
 * 
 * Simple method that renders content locker.
 * 
 * @access public   
 *                         
 */ 

ElectroContentLocker.prototype.Render = function()
    {
    if (this.IsQuirks == true)
        {
        this.ContWidth = document.body.scrollWidth; 
        this.ContHeight = Math.max(document.body.scrollHeight, document.body.clientHeight);
        }
    else
        {
        this.ContWidth = window.innerWidth; 
        this.ContHeight = window.innerHeight;
        }  
    
    this.ContHeight = (this.ContHeight == 'undefined') ? 0 : this.ContHeight; 
    this.ContWidth = (this.ContWidth == 'undefined') ? 0 : this.ContWidth;  
          
    this.DrawOverlay();
    this.DrawContentBox();
  
    this.PrepareStyles();
    this.onStyleChange();   
    this.SetContent('<p>Loading...</p>');
    this.onResize();
                     
    this.RequestContent();   
    this.CheckStatus();     
    }
  
/**
 * Method that draws overlay for the content locker.
 * 
 * Simple method that draws overlay for the content locker.
 * 
 * @access public    
 *                        
 */  
  
ElectroContentLocker.prototype.DrawOverlay  = function()
    {                    
    this.Overlay = document.createElement('div');          
    this.Overlay.setAttribute('class', this.CSSPrefix + '_ElectroContentLocker_Overlay');
                        
    document.body.insertBefore(this.Overlay, document.body.firstChild);  
    } 
  
/**
 * Method that draws content blocker.
 * 
 * Simple method that draws content blocker.
 * 
 * @access public    
 *                        
 */    
    
ElectroContentLocker.prototype.DrawContentBox = function()
    {
    this.BGCont = document.createElement('div');  
    this.BlockerContOut = document.createElement('div');  
    this.BlockerContIn = document.createElement('div');
    this.BlockerBGCont = document.createElement('div');    
    this.BlockerBorderCont = document.createElement('div');
    //this.BlockerBorderImg = document.createElement('img');
    this.BlockerTextCont = document.createElement('div');

    this.Overlay.appendChild(this.BGCont);
    this.BlockerContIn.appendChild(this.BlockerBGCont);
    this.BlockerContIn.appendChild(this.BlockerBorderCont);
    this.BlockerBorderCont.appendChild(this.BlockerBorderImg); 
    this.BlockerContOut.appendChild(this.BlockerContIn);  
    this.Overlay.appendChild(this.BlockerContOut);  
  
    if (this.ContentAttachment == 'floatabove')
        {
        this.Overlay.appendChild(this.BlockerTextCont); 
        }
    else
        {
        this.BlockerContIn.appendChild(this.BlockerTextCont);  
        }      
    }  

/**
 * Method that prepares all the necessary styles for the content locker.
 * 
 * Simple method that prepares all the necessary styles for the content locker.
 * 
 * @access public    
 *                        
 */  

ElectroContentLocker.prototype.PrepareStyles = function()
    {
    /* Overlay styles starts here */
  
    this.Overlay.style.display = 'none';
  
    this.Overlay.style.top = '0px';
    this.Overlay.style.left = '0px';
         	
    /* Overlay styles ends here */

    /* Background container styles starts here */
  
    this.BGCont.style.top = '0px';
    this.BGCont.style.left = '0px';

    this.BGCont.style.backgroundColor = this.OVColor;
    this.BGCont.style.backgroundImage = (this.BlockerOverlayImgURL === null) ? 'none' : 'url("' + this.BlockerOverlayImgURL + '")';
    this.BGCont.style.backgroundPosition = "top left";
    this.BGCont.style.backgroundRepeat = 'repeat';
  
    this.SetOpacity(this.BGCont, this.OVOpacity);  
  
    /* Background container styles starts here */

    /* Blocker background container styles starts here */

    this.BlockerBGCont.style.position = 'relative';
  
    this.BlockerBGCont.style.backgroundColor = this.BGColor;
    this.SetOpacity(this.BlockerBGCont, this.BGOpacity);
   
    /* Blocker background container styles ends here */

    /* Blocker outer container styles starts here */
	
    this.BlockerContOut.style.cssFloat = 'left';
    this.BlockerContOut.style.position = 'relative';
  
    //this.BlockerContOut.style.transform = 'rotate(-15deg)';
  	
    /* Blocker outer container styles ends here */  

    /* Blocker inner container styles starts here */
	
    this.BlockerContIn.style.overflow = 'hidden';
	
    /* Blocker inner container styles ends here */ 

    /* Blocker border conatiner styles starts here */
	
    this.BlockerBorderCont.style.position = 'relative';
    this.BlockerBorderCont.style.left = '0px';
	
    /* Blocker border conatiner styles ends here */ 

    /* Blocker border image container styles starts here */
  
    if (this.BlockerBorderImg !== null) 
        {		  
        this.BlockerBorderImg.border = "0";
        this.BlockerBorderImg.alt = "";
        this.BlockerBorderImg.title = "";       
        }
  
    /* Blocker border image container styles ends here */

    /* Blocker text container styles starts here */
  
    this.BlockerTextCont.style.overflow = 'hidden';
    this.BlockerTextCont.style.padding = this.BlockerTextContPadding + 'px';  
	
    /* Blocker text container styles ends here */ 
    }
  
/**
 * Method that requests content for the content locker from the remote server.
 * 
 * Simple method that requests content for the content locker from the remote server.
 * 
 * @access public    
 *                        
 */     
  
ElectroContentLocker.prototype.RequestContent = function()
    {
    var tmpHead = null;  
    var tmpScript = null;  
    var tmpProp = null;
                                                                                                
    if (typeof this.LastJSONPPrefixRecCont != 'string')
        {                           
        this.LastJSONPPrefixRecCont = this.GenRandString(5); 
  
        tmpScript = document.createElement('script');
        tmpScript.src = this.ContentURL;
        tmpScript.id = this.LastJSONPPrefixRecCont + '_ElectroContentLocker_RequestContentJSONPCont';
        tmpScript.type = 'text/javascript';
        tmpScript.charset = 'utf-8';
                  
        tmpHead = document.getElementsByTagName('head')[0];
        tmpHead.appendChild(tmpScript);  
        }  
    else
        {
        if (this.IsIE == true)
            {
            tmpScript = document.getElementById(this.LastJSONPPrefixRecCont + '_ElectroContentLocker_RequestContentJSONPCont');
            tmpScript.src = this.ContentURL;
            }
        else
            {
            while (tmpScript = document.getElementById(this.LastJSONPPrefixRecCont + '_ElectroContentLocker_RequestContentJSONPCont')) 
                {
                tmpScript.parentNode.removeChild(tmpScript);

                for (var tmpProp in tmpScript) 
                    {
                    delete tmpScript[tmpProp];
                    }
                }
		
            this.LastJSONPPrefixRecCont = null;	
            this.RequestContent();
            }  
        } 
    }
  
/**
 * Method that loads status of the content locker from the remote server.
 * 
 * Simple method that loads status of the content locker from the remote server.
 * 
 * @access public    
 *                        
 */     
  
ElectroContentLocker.prototype.CheckStatus = function()
    {
    var tmpHead = null;  
    var tmpScript = null;  
    var tmpProp = null;
                                    
    if (typeof this.LastJSONPPrefixCkStat != 'string')
        {
        this.LastJSONPPrefixCkStat = this.GenRandString(5); 
         
        tmpScript = document.createElement('script');
        tmpScript.src = this.StatusCheckURL;
        tmpScript.id = this.LastJSONPPrefixCkStat + '_ElectroContentLocker_CheckStatusJSONPCont'; 
        tmpScript.type = 'text/javascript';
        tmpScript.charset = 'utf-8';
      
        tmpHead = document.getElementsByTagName('head')[0];
        tmpHead.appendChild(tmpScript);  
        }  
    else
        {       
        if (this.IsIE == true)
            {       
            tmpScript = document.getElementById(this.LastJSONPPrefixCkStat + '_ElectroContentLocker_CheckStatusJSONPCont');  
            tmpScript.src = this.StatusCheckURL;   
            }
        else
            {
            while (tmpScript = document.getElementById(this.LastJSONPPrefixCkStat + '_ElectroContentLocker_CheckStatusJSONPCont')) 
                {             
                tmpScript.parentNode.removeChild(tmpScript);

                for (var tmpProp in tmpScript) 
                    {
                    delete tmpScript[tmpProp];
                    }
                }
		
            this.LastJSONPPrefixCkStat = null;
            this.CheckStatus();
            }  
        } 
    }  

/**
 * Method that binds all the event handlers to the elements.
 * 
 * Simple method that binds all the event handlers to the elements.
 * 
 * @access public    
 *                        
 */   

ElectroContentLocker.prototype.BindEvents = function()
    {      
    var tmpSelf = this;
    var tmpElements = null;
    var tmpRegExp = null;
    var tmpFunc = function(usrEvent)
                    {    
                    var tmpEvent = usrEvent ? usrEvent : window.event;
    
                    if (tmpEvent.preventDefault) {tmpEvent.preventDefault();}
                    tmpEvent.returnValue = false;
                              
                    tmpSelf.UnBindBlockerShowEvents(tmpFunc); 	
                    tmpSelf.ShowLocker();
                    return false;
                    }

    var Counter1 = 0;

    switch(this.LoadEvent)
        {
        case 'onclick':
      
        if (this.IsIE == false)
            {
            document.addEventListener('click', tmpFunc, false);
            }
        else
            {
            document.attachEvent('onclick', tmpFunc);
            }
 
        break;

        case 'link':
        case 'csslink':

        if (this.ElementPattern !== null) {tmpRegExp = new RegExp(this.ElementPattern);}

        tmpElements = document.getElementsByTagName("a");
        for (Counter1 = 0; Counter1 < tmpElements.length; Counter1++) 
            {
            if (this.ElementPattern !== null && this.LoadEvent == 'link') {if (tmpElements[Counter1].href.search(tmpRegExp) != 0) {continue;}}
            if (this.ElementPattern !== null && this.LoadEvent == 'csslink')
                {
                if (!tmpElements[Counter1].className) {continue;}
                if (tmpElements[Counter1].className.search(tmpRegExp) != 0) {continue;}
                }

            if (this.IsIE == false)
                {
                tmpElements[Counter1].addEventListener('click', tmpFunc, false);
                }
            else
                {
                tmpElements[Counter1].attachEvent('onclick', tmpFunc);
                }
            }

        break
        }
    }

/**
 * Method that unbinds all the event handlers that are connected to blocker show.
 * 
 * Simple method that unbinds all the event handlers that are connected to blocker show.
 * 
 * @access public    
 *       
 * @param object usrFunc function that was bound to the elements
 *
 */   

ElectroContentLocker.prototype.UnBindBlockerShowEvents = function(usrFunc)
    {
    var tmpElements = null
    var Counter1 = 0;

    switch(this.LoadEvent)
        {
        case 'onclick':

        if (this.IsIE == false)
            {
            document.removeEventListener('click', usrFunc, false); 
            }
        else
            {
            document.detachEvent('onclick', usrFunc);
            }
 
        break;

        case 'link':
        case 'csslink':

        tmpElements = document.getElementsByTagName("a");
        for (Counter1 = 0; Counter1 < tmpElements.length; Counter1++) 
            {
            if (this.IsIE == false)
                {
                tmpElements[Counter1].removeEventListener('click', usrFunc, false);
                }
            else
                {
                tmpElements[Counter1].detachEvent('onclick', usrFunc);
                }
            }

        break
        }
    }

/**
 * Method that show content locker.
 * 
 * Simple method that show content locker.
 * 
 * @access public    
 *                        
 */     
  
ElectroContentLocker.prototype.ShowLocker = function()
    {
    var tmpSelf = this;
    var tmpExecFunc = function() 
                        { 
                        tmpSelf.onStyleChange(); 
                        tmpSelf.Overlay.style.display = 'block';

                        tmpSelf.onResize(); 

                        if (tmpSelf.BlockerProtection == true && tmpSelf.ProtectTimeout === null)
                            {
                            tmpSelf.ProtectTimeout = setInterval(function()
                                                        {					
                                                        tmpSelf.onStyleChange(); 
                                                        tmpSelf.ShowLocker();
                                                        tmpSelf.onResize(); 
                                                        }, 
                                                        1000);   
                            }  
                        };

    if (this.ShowDelay !== null && this.ShowDelayTimeout === null)
        {
        this.ShowDelayTimeout = setTimeout(tmpExecFunc, this.ShowDelay);
        }
    else
        {
        tmpExecFunc();
        }
    }

/**
 * Method that hides content locker.
 * 
 * Simple method that hides content locker.
 * 
 * @access public    
 *                        
 */  

ElectroContentLocker.prototype.HideLocker = function()
    {
    if (this.BlockerProtection == true && this.ProtectTimeout !== null)
        {
        clearInterval(this.ProtectTimeout);
        this.ProtectTimeout = null;
        } 

    if (this.ShowDelayTimeout === null)
        {
        clearTimeout(this.ShowDelayTimeout);
        this.ShowDelayTimeout = null;
        }

    this.StopStatusChecking();
    this.Overlay.style.display = 'none';
    }
  
/**
 * Method that starts the cycle of checking content blocker status.
 * 
 * Simple method that starts the cycle of checking content blocker status.
 * 
 * @access public  
 *  
 * @return bool true if cycle started correctly and false if not.
 *                        
 */    
  
ElectroContentLocker.prototype.StartStatusChecking = function() 
    {
    var tmpSelf = this;  
    
    if (this.CheckStatusDelay <= 0) {return false;}
    this.StopStatusChecking();
    
    this.CheckStatusTimeout = setTimeout(function(){tmpSelf.CheckStatus();}, this.CheckStatusDelay); 
    return true;
    }
  
/**
 * Method that stops the cycle of checking content blocker status.
 * 
 * Simple method that stops the cycle of checking content blocker status.
 * 
 * @access public  
 *                        
 */      
  
ElectroContentLocker.prototype.StopStatusChecking = function() 
    {
    if (this.CheckStatusTimeout !== null)
        {
        clearTimeout(this.CheckStatusTimeout);
        this.CheckStatusTimeout = null;
        }  
    }
  
/**
 * Method that adds data to already existing content.
 * 
 * Simple method that adds data to already existing content.
 * 
 * @access public    
 * 
 * @param string usrContent content locker content
 * 
 * @return bool true if content for the content locker was added successfully and false on fail.
 *              
 */  

ElectroContentLocker.prototype.AddContent = function(usrContent)
    {
    if (typeof usrContent != 'string') {return false;}
    if (this.IsLoaded == false)
        {
        this.ContentBuffer = usrContent;
        return true;
        }
    
    if (this.BlockerContentCont !== null) 
        {
        this.BlockerContentCont.innerHTML += usrContent;
        }	
    else
        {
        this.BlockerContentCont = document.createElement('div');    
  
        this.BlockerContentCont.style.width = '100%';  
        this.BlockerContentCont.style.cssFloat = 'left';  
        this.BlockerContentCont.style.styleFloat = 'left';
        this.BlockerContentCont.style.float = 'left'; 
        this.BlockerContentCont.noWrap = true; 
   
        this.BlockerTextCont.appendChild(this.BlockerContentCont);
        this.BlockerContentCont.innerHTML = usrContent;    
        }

    this.onResize();  
    return true;
    }    

/* Core methods ends here */

/* Action methods starts here */

/**
 * Event handle that is invoked whenever document body was loaded.
 * 
 * Simple method that is invoked whenever document body was loaded.
 * 
 * @access public   
 *
 * @param bool true all goes well and false if not
 *                         
 */ 

ElectroContentLocker.prototype.onBodyLoad = function()
    {
    var tmpSelf = this;  
                   
    if (this.InitTimeout != null) {clearInterval(this.InitTimeout);}
    this.IsLoaded = true;
               
    // IE 5.5, 6, 7 fix
    if (navigator.appName == 'Microsoft Internet Explorer') 
        {
        this.IsIE = true;  
        if (document.compatMode == undefined || document.compatMode != 'CSS1Compat')
            {
            this.IsQuirks = true;
            } 
        } 
                 
    this.Render();   
    this.BindEvents();

    if (this.LoadEvent == 'autoload')
        {
        this.ShowLocker();
        }

    if (this.ContentBuffer !== null) 
        {
        this.SetContent(this.ContentBuffer);
        this.ContentBuffer = null;
        }
  
    return true;  
    }  
  
/**
 * Event handle that is invoked whenever user changes content blocker styles.
 * 
 * Simple method that is invoked whenever user changes content blocker styles. It is also can be invoked to reset content blocker styles.
 * 
 * @access public   
 *
 * @return bool true all goes well and false if not
 *                         
 */     
  
ElectroContentLocker.prototype.onStyleChange = function()
    {   
    /* Overlay styles starts here */
  
    this.Overlay.style.position = (this.IsQuirks ? 'absolute' : 'fixed');
    this.Overlay.style.overflow = 'auto';
  
    this.Overlay.style.zIndex = '999997';  
        	
    /* Overlay styles ends here */
  
    /* Background container styles starts here */
  
    this.BGCont.style.position = 'absolute';
    
    /* Background container styles starts here */  
			
    /* Blocker background container styles starts here */
    /* Blocker background container styles ends here */
  
    /* Blocker outer container styles starts here */
    /* Blocker outer container styles ends here */  
  
    /* Blocker inner container styles starts here */
    /* Blocker inner container styles ends here */  
  
    /* Blocker border conatiner styles starts here */	
    /* Blocker border conatiner styles ends here */  
  	
    /* Blocker border image container styles starts here */  
    /* Blocker border image container styles ends here */
	
    /* Blocker text container styles starts here */
 
    if (this.ContentAttachment == 'floatabove')
        {
        this.BlockerTextCont.style.position = 'absolute'; 
        }
    else
        {
        this.BlockerTextCont.style.position = 'relative';
        }     
  
    /* Blocker text container styles ends here */ 
    }
  
/**
 * Event handle that is invoked whenever user resizes browser window.
 * 
 * Simple method that is invoked whenever user resizes browser window.
 * 
 * @access public   
 *
 * @return bool true all goes well and false if not
 *                         
 */   
  
ElectroContentLocker.prototype.onResize = function()
    {     
    var tmpTop = 0;    
    var tmpLeft = 0;  

    var tmpWidth = this.BlockerContentCont.scrollWidth;
    var tmpHeight = this.BlockerContentCont.scrollHeight;
    
    /* Overlay positioning starts here */
  
    if (this.IsQuirks == true)
        {
        this.ContWidth = document.body.scrollWidth; 
        this.ContHeight = Math.max(document.body.scrollHeight, document.body.clientHeight);
        }
    else
        {
        if (this.IsIE == true)
            {
            this.ContWidth = document.body.clientWidth;
            this.ContHeight = document.body.clientHeight; 
            }
        else
            {
            if (this.IsIE == true)
                {
                this.ContWidth = document.body.clientWidth;
                this.ContHeight = document.body.clientHeight; 
                }
            else
                {
                this.ContWidth = window.innerWidth;
                this.ContHeight = window.innerHeight; 
                }
            }
        }  
    
    if (this.UserWidth !== null) {tmpWidth = parseFloat(this.UserWidth);} else if (this.UserWidth === null && this.BlockerBorderImg !== null){tmpWidth = this.BlockerBorderImg.width;} else {tmpWidth = 0;}
    if (this.UserHeight !== null) {tmpHeight = parseFloat(this.UserHeight);} else if (this.UserHeight === null && this.BlockerBorderImg !== null){tmpHeight = this.BlockerBorderImg.height;} else {tmpHeight = 0;} 
  
    this.ContHeight = (typeof this.ContHeight == 'number') ? this.ContHeight : 0; 
    this.ContWidth = (typeof this.ContWidth == 'number') ? this.ContWidth : 0;
                                             
    this.Overlay.style.height =  (!this.IsQuirks && this.IsIE) ? '100%' : (this.ContHeight < tmpHeight ? tmpHeight : this.ContHeight) + 'px';
    this.Overlay.style.width = '100%';
  
    /* Overlay positioning ends here */
  
    /* Background container positioning starts here */
         
    this.BGCont.style.width = '100%';
    this.BGCont.style.height = (!this.IsQuirks && this.IsIE) ? '100%' : (this.ContHeight < tmpHeight ? tmpHeight : this.ContHeight) + 'px';
  
    /* Background container positioning ends here */  
                             
    tmpTop = (this.Overlay.clientHeight / 2) - (tmpHeight / 2);
    tmpLeft = (this.Overlay.clientWidth / 2) - (tmpWidth / 2);   
    
    /* Blocker outer container styles starts here */

    this.BlockerContOut.style.width = tmpWidth + 'px';
    this.BlockerContOut.style.height = tmpHeight + 'px';

    this.BlockerContOut.style.top = tmpTop + 'px';
    this.BlockerContOut.style.left = tmpLeft + 'px';
	
    /* Blocker outer container styles starts here */
	
    /* Blocker inner container styles starts here */
	
    this.BlockerContIn.style.width = tmpWidth + 'px';
    this.BlockerContIn.style.height = tmpHeight + 'px';
	
    /* Blocker inner container styles ends here */
	
    /* Blocker background container styles starts here */
	
    this.BlockerBGCont.style.width = tmpWidth + 'px';
    this.BlockerBGCont.style.height = tmpHeight + 'px';
  
    /* Blocker background container styles ends here */
  
    /* Blocker border conatiner styles starts here */
	
    this.BlockerBorderCont.style.width = tmpWidth + 'px';
    this.BlockerBorderCont.style.height = tmpHeight + 'px';
    this.BlockerBorderCont.style.top = '-' + tmpHeight + 'px';
	
    /* Blocker border conatiner styles ends here */
	
    /* Blocker text container resizing starts here */
  
    //this.BlockerTextCont.style.backgroundColor = 'red'

    if (this.UserContentWidth !== null) {this.BlockerTextCont.style.width = this.UserContentWidth + 'px';}
    if (this.UserContentHeight !== null) {this.BlockerTextCont.style.height = this.UserContentHeight + 'px';}

    this.BlockerTextCont.style.padding = this.BlockerTextContPadding + 'px';  
  
    if (this.ContentAttachment == 'floatabove')
        {
        this.BlockerTextCont.style.left = (this.Overlay.clientWidth / 2) - (this.BlockerTextCont.offsetWidth  / 2) + 'px';  
        this.BlockerTextCont.style.top = (this.Overlay.clientHeight / 2) - (this.BlockerTextCont.offsetHeight / 2) + 'px';    
        }
    else
        {
        /* Horizontal align starts here */

        if (this.ContentHAlign == 'left') {this.BlockerTextCont.style.left = '0px';}
        else if (this.ContentHAlign == 'center')
            {	
            this.BlockerTextCont.style.left = ((tmpWidth / 2) - (this.BlockerTextCont.offsetWidth / 2)) + 'px';
            }
        else if (this.ContentHAlign == 'right')
            {
            this.BlockerTextCont.style.left = (tmpWidth - this.BlockerTextCont.offsetWidth) + 'px';
            }	
    
        /* Horizontal align ends here */
      
        /* Vertical align starts here */  
      
        if (this.ContentVAlign == 'top') {this.BlockerTextCont.style.top = '-' + (tmpHeight * 2) + 'px';}
        else if (this.ContentVAlign == 'center') 
            {	
            this.BlockerTextCont.style.top = '-' + ((tmpHeight * 2) - ((tmpHeight - this.BlockerTextCont.offsetHeight) / 2)) + 'px'; 
            }   
        else if (this.ContentVAlign == 'bottom')
            {
            this.BlockerTextCont.style.top = '-' + (tmpHeight + this.BlockerTextCont.offsetHeight) + 'px';
            }
      
        /* Vertical align ends here */    
        }
      
    /* Blocker text container resizing ends here */
  
    /* Blocker border image container styles starts here */

    if (this.BlockerBorderImg.complete == true)
        {
        this.BlockerBorderImg.style.width = tmpWidth + 'px';
        this.BlockerBorderImg.style.height = tmpHeight + 'px';
        }
  
    this.BlockerBorderImg.alt = "";
                     
    /* Blocker border image container styles ends here */  
        
    return true;  
    }
  
ElectroContentLocker.prototype.onJSONPContentReceived = function(usrContent)
    {
    this.SetContent(usrContent);  
    }

/* Action methods ends here */

/* Get methods starts here */   

/**
 * Method that returns client language code.
 * 
 * Simple method that returns client language code.
 * 
 * @access public    
 *             
 * @return string language code
 *              
 */  

ElectroContentLocker.prototype.GetLang = function()
    {
    return this.Lang;
    }
    
/**
 * Method that returns client location URL.
 * 
 * Simple method that returns client location URL.
 * 
 * @access public    
 *             
 * @return string client location URL.
 *              
 */    
  
ElectroContentLocker.prototype.GetClientURL = function()
    {
    return this.URL;
    } 
  
/**
 * Method that returns referrer URL.
 * 
 * Simple method that returns referrer URL.
 * 
 * @access public    
 *             
 * @return string referrer URL.
 *              
 */    
  
ElectroContentLocker.prototype.GetClientReferrer = function()
    {
    return this.Referrer;
    }  
  
/**
 * Method that returns width of content locker parent container.
 * 
 * Simple method that returns width of content locker parent container.
 * 
 * @access public    
 *             
 * @return int parent container width.
 *              
 */   
  
ElectroContentLocker.prototype.GetContWidth = function() 
    {
    return this.ContWidth;
    } 
  
/**
 * Method that returns height of content locker parent container.
 * 
 * Simple method that returns height of content locker parent container.
 * 
 * @access public    
 *             
 * @return int parent container height.
 *              
 */   
  
ElectroContentLocker.prototype.GetContHeight = function() 
    {
    return this.ContHeight;
    }   
  
/**
 * Method that returns padding of content locker text container node.
 * 
 * Simple method that returns padding of content locker text container node.
 * 
 * @access public    
 * 
 * @return int padding of content locker text container node.
 *              
 */    
  
ElectroContentLocker.prototype.GetBlockerTextContPadding = function()  
    {
    return this.BlockerTextContPadding;
    } 
    
/**
 * Method that returns current page character encoding.
 * 
 * Simple method that returns current page character encoding.
 * 
 * @access public    
 * 
 * @return string character encoding.
 *              
 */     
    
ElectroContentLocker.prototype.GetCharSet = function()  
    {
    return document.characterSet ? document.characterSet : document.charset;
    }     
  
/* Get methods ends here */

/* Set methods starts here */

/**
 * Method that sets parameter which indicates on which event blocker will be shown.
 * 
 * Simple method that sets parameter which indicates on which event blocker will be shown ('autoload' - blocker will be shown instantly, 'onclick' - blocker will be shown when user clicks anywhere on the page, 'link' - blocker will be shown when user clicks any link or link with spcific URL pattern, 'csslink' - blocker will be shown when user clicks a link with specific css class pattern).
 * 
 * @access public    
 * 
 * @param string usrLoadEvent parameter value
 * 
 * @return bool true if parameter value was set successfully and false on fail.
 *              
 */ 

ElectroContentLocker.prototype.SetLoadEvent = function(usrLoadEvent)
    {
    if (typeof usrLoadEvent != 'string') {return false;}
    usrLoadEvent = usrLoadEvent.toLowerCase();

    this.LoadEvent = usrLoadEvent;
    return true;
    }

/**
 * Method that sets pattern that is used in conjunction with this.LoadEvent.
 * 
 * Simple method that sets pattern that is used in conjunction with this.LoadEvent.
 * 
 * @access public    
 * 
 * @param string usrElementPattern pattern
 * 
 * @return bool true if pattern was set successfully and false on fail.
 *              
 */ 

ElectroContentLocker.prototype.SetElementPattern = function(usrElementPattern)
    {
    if (typeof usrElementPattern != 'string') {return false;}
    this.ElementPattern = usrElementPattern;
    return true;
    }

/**
 * Method that sets property which indicates how text container will behave.
 * 
 * Simple method that sets property which indicates how text container will behave (possible values: 'normal', 'floatabove').
 * 
 * @access public    
 * 
 * @param string usrContentAttachment property value
 * 
 * @return bool true if property value was set successfully and false on fail.
 *              
 */ 
  
ElectroContentLocker.prototype.SetContentAttachment  = function(usrContentAttachment)
    {
    if (typeof usrContentAttachment != 'string') {return false;} 
    var tmpOldVal = this.ContentAttachment;
    this.ContentAttachment = usrContentAttachment;
  
    if (this.IsLoaded == true) 
        {
        if (tmpOldVal == 'normal') {this.BlockerContIn.removeChild(this.BlockerTextCont); }  
        else {this.Overlay.removeChild(this.BlockerTextCont); }  
    
        if (this.ContentAttachment == 'normal') {this.BlockerContIn.appendChild(this.BlockerTextCont);}
        else {this.Overlay.appendChild(this.BlockerTextCont);}
      
        this.onStyleChange();
        this.onResize();
        }

    return true;
    } 
  
/**
 * Method that sets horizontal align of the content container.
 * 
 * Simple method that sets horizontal align of the content container (possible values: 'left', 'center', 'right').
 * 
 * @access public    
 * 
 * @param string usrContentHAlign horizontal align
 * 
 * @return bool true if horizontal align was set successfully and false on fail.
 *              
 */   
  
ElectroContentLocker.prototype.SetContentHAlign  = function(usrContentHAlign)
    {
    if (typeof usrContentHAlign != 'string') {return false;} 
    this.ContentHAlign = usrContentHAlign;
  
    if (this.IsLoaded == true) 
        {      
        this.onResize();
        }  
  
    return true;
    }  
  
/**
 * Method that sets vertical align of the content container.
 * 
 * Simple method that sets vertical align of the content container (possible values: 'top', 'center', 'bottom').
 * 
 * @access public    
 * 
 * @param string usrContentVAlign vertical align
 * 
 * @return bool true if vertical align was set successfully and false on fail.
 *              
 */   
  
ElectroContentLocker.prototype.SetContentVAlign  = function(usrContentVAlign)
    {
    if (typeof usrContentVAlign != 'string') {return false;} 
    this.ContentVAlign = usrContentVAlign;
  
    if (this.IsLoaded == true) 
        {      
        this.onResize();
        }  
  
    return true;
    }
  
/**
 * Method that sets width of the content locker.
 * 
 * Simple method that sets width of the content locker.
 * 
 * @access public    
 * 
 * @param int|float usrWidth content locker width
 * 
 * @return bool true if width was set successfully and false on fail.
 *              
 */   

ElectroContentLocker.prototype.SetWidth = function(usrWidth)
    {
    if (typeof usrWidth != 'number') {return false;}  

    this.UserWidth = usrWidth;
    if (this.IsLoaded == true) {this.onResize();};
    return true;
    }

/**
 * Method that sets height of the content locker.
 * 
 * Simple method that sets height of the content locker.
 * 
 * @access public    
 * 
 * @param int|float usrHeight content locker height
 * 
 * @return bool true if height was set successfully and false on fail.
 *              
 */  

ElectroContentLocker.prototype.SetHeight = function(usrHeight)
    {
    if (typeof usrHeight != 'number') {return false;}  
    
    this.UserHeight = usrHeight;
    if (this.IsLoaded == true) {this.onResize();};
    return true;
    }
  
/**
 * Method that sets width of the content.
 * 
 * Simple method that sets width of the content.
 * 
 * @access public    
 * 
 * @param int|float usrWidth content width
 * 
 * @return bool true if width was set successfully and false on fail.
 *              
 */   

ElectroContentLocker.prototype.SetContentWidth = function(usrWidth)
    {
    if (typeof usrWidth != 'number') {return false;}  
    
    this.UserContentWidth = usrWidth;
    if (this.IsLoaded == true) {this.onResize();};
    return true;
    }  
  
/**
 * Method that sets height of the content.
 * 
 * Simple method that sets height of the content.
 * 
 * @access public    
 * 
 * @param int|float usrHeight content height
 * 
 * @return bool true if height was set successfully and false on fail.
 *              
 */  

ElectroContentLocker.prototype.SetContentHeight = function(usrHeight)
    {
    if (typeof usrHeight != 'number') {return false;}  
    
    this.UserContentHeight  = usrHeight;
    if (this.IsLoaded == true) {this.onResize();};
    return true;
    }  
  
/**
 * Method that sets padding for content locker text container node.
 * 
 * Simple method that sets padding for content locker text container node.
 * 
 * @access public    
 * 
 * @param int|float usrPadding content locker text container node padding
 * 
 * @return bool true if padding was set successfully and false on fail.
 *              
 */    
  
ElectroContentLocker.prototype.SetBlockerTextContPadding = function(usrPadding)  
    {
    if (typeof usrPadding != 'number') {return false;}  
    
    this.BlockerTextContPadding = usrPadding;
    if (this.IsLoaded == true) {this.onResize();};
    return true;
    }
  
  
/**
 * Method that sets value for the property that indicates whenever content blocker must fit border image width and height.
 * 
 * Simple method that sets value for the property that indicates whenever content blocker must fit border image width and height.
 * 
 * @access public    
 * 
 * @param bool usrFit property value
 * 
 * @return bool true if property value was set successfully and false on fail.
 *              
 */   
  
ElectroContentLocker.prototype.SetFitBorderImage = function(usrFit)
    {
    if (typeof usrFit != 'boolean') {return false;}   
    this.FitBorderImage = usrFit;
  
    if (this.FitBorderImage == true)
        {
        if (this.IsLoaded == true && this.BlockerBorderImg !== null && this.BlockerBorderImg.complete === true) 
            {
            this.SetWidth(this.BlockerBorderImg.width);
            this.SetHeight(this.BlockerBorderImg.height);
            }   
        } 
    
    return true;
    }
   
/**
 * Method that sets URL for image of overlay.
 * 
 * Simple method that sets URL for image of overlay.
 * 
 * @access public    
 * 
 * @param string usrURL overlay image
 * 
 * @return bool true if URL was set successfully and false on fail.
 *              
 */   
  
ElectroContentLocker.prototype.SetBlockerOverlayImgURL = function(usrURL)
    {
    if (typeof usrURL != 'string') {return false;}   
    this.BlockerOverlayImgURL = usrURL;
  
    if (this.IsLoaded == true) 
        {
        this.BGCont.style.backgroundImage = 'url("' + usrURL + '")';
        };

    return true;    
    }  

/**
 * Method that sets URL for border image.
 * 
 * Simple method that sets URL for border image.
 * 
 * @access public    
 * 
 * @param string usrURL border image URL
 * 
 * @return bool true if URL was set successfully and false on fail.
 *              
 */ 

ElectroContentLocker.prototype.SetBlockerBorderImgURL = function(usrURL)  
    {
    var tmpSelf = this;
    this.BlockerBorderImg = new Image();    
    
    if (typeof usrURL != 'string') {return false;}   
    this.BlockerBorderImgURL = usrURL;
  
    this.BlockerBorderImg.src = usrURL; 
    if (this.FitBorderImage == true)
        {
        this.BlockerBorderImg.onload = function()
                                        {					
                                        tmpSelf.SetWidth(this.width);
                                        tmpSelf.SetHeight(this.height);
                                        } 
          
        if (this.BlockerBorderImg.complete == true) 
            {
            tmpSelf.SetWidth(this.BlockerBorderImg.width);
            tmpSelf.SetHeight(this.BlockerBorderImg.height);
            }        
        }  

    return true;
    }
  
/**
 * Method that sets opacity for selected element.
 * 
 * Simple method that sets opacity for selected element.
 * 
 * @access public   
 * 
 * @param object usrElement selected element
 * @param int usrOpacity opacity (range from 0 to 100)
 *          
 * @return bool true if opacity was set successfully and false if not
 *	    
 */ 

ElectroContentLocker.prototype.SetOpacity = function(usrElement, usrOpacity)
    {
    if (typeof usrElement != 'object') {return false;}
    if (typeof usrOpacity != 'number' || usrOpacity < 0) {return false;}

    if (usrOpacity >= 100) 
        {
        usrElement.style.opacity = '1';
        usrElement.style.filter = 'alpha(opacity=100)';
        }
    else if (usrOpacity == 0)
        {
        usrElement.style.opacity = '0';
        usrElement.style.filter = 'alpha(opacity=0)';
        }
    else
        {
        usrElement.style.opacity = '0.' + usrOpacity;
        usrElement.style.filter = 'alpha(opacity=' + usrOpacity + ')';
        }

    return true;
    }  
  
/**
 * Method that sets background opacity for content locker overlay.
 * 
 * Simple method that sets background opacity for content locker overlay.
 * 
 * @access public    
 * 
 * @param int usrOpacity opacity
 * 
 * @return bool true if opacity was set successfully and false on fail.
 *              
 */   
  
ElectroContentLocker.prototype.SetOVOpacity = function(usrOpacity)
    {
    if (typeof usrOpacity != 'number' || usrOpacity < 0) {return false;}
    this.OVOpacity = usrOpacity;

    if (this.IsLoaded == true) 
        {
        this.SetOpacity(this.BGCont, this.OVOpacity);
        }

    return true;
    }  
  
/**
 * Method that sets background opacity for content locker.
 * 
 * Simple method that sets background opacity for content locker.
 * 
 * @access public    
 * 
 * @param int usrOpacity opacity
 * 
 * @return bool true if opacity was set successfully and false on fail.
 *              
 */ 

ElectroContentLocker.prototype.SetBGOpacity = function(usrOpacity)
    {
    if (typeof usrOpacity != 'number' || usrOpacity < 0) {return false;}
    this.BGOpacity = usrOpacity;

    if (this.IsLoaded == true) 
        {
        this.SetOpacity(this.BlockerBGCont, this.BGOpacity);
        }

    return true;
    }
  
/**
 * Method that sets background color of content locker overlay.
 * 
 * Simple method that sets background color of content locker overlay.
 * 
 * @access public    
 * 
 * @param string usrBGColor background color
 * 
 * @return bool true if background color was set successfully and false on fail.
 *              
 */ 

ElectroContentLocker.prototype.SetOVColor = function(usrBGColor)
    {
    if (typeof usrBGColor != 'string') {return false;}   
    this.OVColor = usrBGColor;

    if (this.IsLoaded == true) 
        {
        this.Overlay.style.backgroundColor = usrBGColor;
        };

    return true;
    }     
  
/**
 * Method that sets background color for content locker.
 * 
 * Simple method that sets background color for content locker.
 * 
 * @access public    
 * 
 * @param string usrBGColor background color
 * 
 * @return bool true if background color was set successfully and false on fail.
 *              
 */ 

ElectroContentLocker.prototype.SetBGColor = function(usrBGColor)
    {
    if (typeof usrBGColor != 'string') {return false;}   
    this.BGColor = usrBGColor;

    if (this.IsLoaded == true) 
        {
        this.BlockerBGCont.style.backgroundColor = usrBGColor;
        };

    return true;
    }    
  
/**
 * Method that sets URL from which content for content blocker will be loaded.
 * 
 * Simple method that sets URL from which content for content blocker will be loaded.
 * 
 * @access public    
 * 
 * @param string usrContentURL content URL
 * 
 * @return bool true if content URL was set successfully and false on fail.
 *              
 */    
  
ElectroContentLocker.prototype.SetContentURL = function(usrContentURL)
    {
    if (typeof usrContentURL != 'string') {return false;}
  
    this.ContentURL = usrContentURL;
    if (this.IsLoaded == true) {this.RequestContent();};
    return true;
    } 
  
/**
 * Method that sets URL from which status of the content locker will be loaded.
 * 
 * Simple method that sets URL from which status of the content locker will be loaded.
 * 
 * @access public    
 * 
 * @param string usrStatusCheckURL status check URL
 * 
 * @return bool true if status check URL was set successfully and false on fail.
 *              
 */    
  
ElectroContentLocker.prototype.SetStatusCheckURL = function(usrStatusCheckURL)
    {
    if (typeof usrStatusCheckURL != 'string') {return false;}
  
    this.StatusCheckURL = usrStatusCheckURL;
    return true;
    }     
    
/**
 * Method that sets content for the content locker.
 * 
 * Simple method that sets content for the content locker.
 * 
 * @access public    
 * 
 * @param string usrContent content locker content
 * 
 * @return bool true if content for the content locker was set successfully and false on fail.
 *              
 */  

ElectroContentLocker.prototype.SetContent = function(usrContent)
    {
    if (typeof usrContent != 'string') {return false;}
    if (this.IsLoaded == false)
        {
        this.ContentBuffer = usrContent;
        return true;
        }
    
    if (this.BlockerContentCont !== null) {this.BlockerTextCont.removeChild(this.BlockerContentCont);}	
  
    this.BlockerContentCont = document.createElement('div');    
  
    this.BlockerContentCont.style.width = '100%';  
    this.BlockerContentCont.style.cssFloat = 'left';  
    this.BlockerContentCont.style.styleFloat = 'left';
    this.BlockerContentCont.style.float = 'left'; 
    this.BlockerContentCont.noWrap = true; 
   
    this.BlockerTextCont.appendChild(this.BlockerContentCont);
    this.BlockerContentCont.innerHTML = usrContent;
    this.onResize(); 
  
    return true;
    }  
 
/**
 * Method that sets delay before content locker will be shown.
 * 
 * Simple method that sets delay before content locker will be shown.
 * 
 * @access public    
 * 
 * @param int usrShowDelay delay
 * 
 * @return bool true if delay was set successfully and false on fail.
 *              
 */ 

ElectroContentLocker.prototype.SetShowDelay = function(usrShowDelay)
    {
    if (typeof usrShowDelay != 'number') {return false;}  
    this.ShowDelay = usrShowDelay;
    return true;
    }
  
/**
 * Method that sets delay before each status check request.
 * 
 * Simple method that sets delay before each status check request.
 * 
 * @access public    
 * 
 * @param int usrCheckStatusDelay delay
 * 
 * @return bool true if delay was set successfully and false on fail.
 *              
 */   

ElectroContentLocker.prototype.SetCheckStatusDelay = function(usrCheckStatusDelay)
    {
    if (typeof usrCheckStatusDelay != 'number') {return false;}  
    this.CheckStatusDelay = usrCheckStatusDelay;
  
    return true;
    }
   
/* Set methods ends here */