var $__MA = (function () {
	var MA = {
		d: document,
		dt: new Date(),
		p: document.getElementById('__maSrc').getAttribute('data-pid'),
		s: document.URL.indexOf('https:')===0?'s':'',
		e: encodeURIComponent,
		n: null,
		h: '',
		ac: '',
		captureStack: [],
		cv: null,
		cN:'__mauuid',
		cE: function() {
			if (parseInt(MA.p) === 7366) {
				return new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toUTCString();
			} else {
				return new Date(new Date().setFullYear(new Date().getFullYear() + 2)).toUTCString();
			}
		},
		gNdN: function() {},
		b: function(p) {
			var pf=p||'';
			return 'https://beacon.cdnma.com/apps/';
			// return 'https://capture.apps-dev.net-results.com/apps/';
		},
		eD: function(d) {
			var fd=d.split('.');
			return fd[fd.length-2]+'.'+fd[fd.length-1];
		},
		beginCapture: function() {
			var d=MA.d;
			MA.doCapture(d.location.href, d.referrer, MA.p);
		},
		doCapture: function(l, r, p) {
			// No type coercion occurs in getCookieByKey, check for literal string "false".
			if (p === 7622 || p === 4891 || p === 6569 || p === 7360 || p === 8826 || getCookieByKey("__macapture") === "false" || userAgentIsBot()) {
				return;
			}
			if (p === 'null' || p === null || p === 'undefined' || p === undefined) {
			    return;
            }
			if (l.indexOf("wayfair.com") > -1) {
			    return;
            }
			var d=MA.d,v=MA.getVisitorId(),e=MA.e,t='script',cN=d.createElement(t), n,df=MA.df();
			MA.ac=MA.uuid();
			cN.type = 'text/java'+t;
			cN.setAttribute("crossorigin", "anonymous");
			cN.src = MA.b()+'capture.php?p='+p+'&l='+e(l)+'&u='+e(l)+'&r='+e(r)+'&uq='+v.v+'&c='+v.c+df+'&o='+v.o+'&ac='+MA.gAC()+'&t='+MA.dt.getTime();
			n=d.getElementsByTagName(t)[0];n.parentNode.insertBefore(cN,n);
			MA.setAccessId(MA.ac);
		},

		doCbCapture: function(l, cb) {
			if (getCookieByKey("__macapture") === "false" || userAgentIsBot()) {
                if (typeof (cb) !== "function") {
                	cb = function() {};
				}
                MA.captureStack = [
                    {
                        p: arguments,
                        f: function(l, cb) {
                            var v=MA.getVisitorId(),i=new Image(1,1),df=MA.df();
                            i.src=MA.b()+'capture.php?p='+MA.p+'&uq='+v.v+'&c='+v.c+df+'&o='+v.o+'&t='+Math.random();
                            i.onload = function () { i.onload = MA.n;i.onerror = MA.n;cb();};
                            i.onerror = function () { i.onload = MA.n;i.onerror = MA.n;cb();};
                        }
                    }
                ];
				return;
			}
			MA.captureStack = [
				{
					p: arguments,
					f: function(l, cb) {
						var d=MA.d,v=MA.getVisitorId(),e=MA.e,i=new Image(1,1),df=MA.df();
						i.src=MA.b()+'capture.php?p='+MA.p+'&l='+e(l)+'&u='+e(l)+'&r='+e(d.referrer)+'&uq='+v.v+'&c='+v.c+df+'&o='+v.o+'&t='+Math.random();
						i.onload = function () { i.onload = MA.n;i.onerror = MA.n;cb();};
						i.onerror = function () { i.onload = MA.n;i.onerror = MA.n;cb();};
					}
				}
			];
		},
		captureDownload: function(l) {
			MA.doCbCapture(l, function() {
				setTimeout(MA.gNdN, 1000);
			});
			if (MA.isIE()) {
				MA.executeStack();
			} else if (MA.isChrome() || MA.isSafari()) {
				var fun = function() {
					MA.executeStack();
					MA.rE(window, 'beforeunload', fun);
				};
				MA.aE(window, 'beforeunload', fun);
			} else {
				setTimeout(function() {
					MA.executeStack();
				}, 20);
			}
		},
		executeStack: function() {
			for (var j=0;j<MA.captureStack.length;j++) {
				var o=MA.captureStack[j];
				o.f.apply(this, o.p);
			}
		},
		getVisitorId: function() {
			if (MA.cv) {
				return MA.cv;
			}
			var o='',v,d=MA.d,dc=d.cookie,dm=d.domain,dom=MA.eD(dm),c=0;
			if(dc&&dc.length>0) {
				var ca=dc.split(';');
				for(var i=0;i<ca.length;i++) {
					var x=ca[i].indexOf('=');
					var k=ca[i].substring(0,x);
					var vi=ca[i].substring(x+1);
					if(k===' __mauuid'||k==='__mauuid'){
						v=vi;
						c=1;
					}else if(k===' __nrvid'||k==='__nrvid'){
						o=vi;
						d.cookie = '__nrvid=; expires='+new Date('01/01/2000').toUTCString()+'; path=/;SameSite=Lax;domain=.'+dom+';';
					}
				}
			}
			if (!v) {
				v=MA.uuid();
			}
			var g=[],h=dm.split('.').reverse(),b,j,e,a;
			for(b=0;b<h.length;b++) {
				a=[];
				for(j=0;j<=b;j++) {
					a.push(h[j])
				}
				g.push(a.reverse().join('.'))
			}
			// for(e=0;e<g.length;e++) {
			// 	d.cookie = '__mauuid='+v+'; expires='+ MA.cE()+'; path=/;SameSite=Lax;domain=.'+g[e]+';';
			// }
			d.cookie = '__mauuid='+v+'; expires='+ MA.cE()+'; path=/;SameSite=Lax;';
			MA.cv = {v:v,c:c,o:o};
			return MA.cv;
		},
		getCookieDomains: function() {
			var d=MA.d,dL,dMs=[];
			dL = d.domain.split('.').concat();
			while (dL.length > 1) {
				dMs.push(dL.join('.'));
				dL.shift();
			}
			return dMs;
		},
		resetCookieId: function() {
			var d=MA.d,j=0,dMs=MA.getCookieDomains();
			MA.cv = null;
			// for (;j<dMs.length;j++) {
			// 	d.cookie = '__mauuid=; expires=' + MA.cE() + '; path=/;SameSite=Lax;domain=.' + dMs[j] + ';';
			// }
			d.cookie = '__mauuid=; expires=' + MA.cE() + '; path=/;SameSite=Lax;';
		},
		setVisitorId: function(u) {
			var d = MA.d,dMs=MA.getCookieDomains(),j=0;
			// for (;j<dMs.length;j++) {
			// 	d.cookie = '__mauuid='+u+'; expires=' + MA.cE() + '; path=/;SameSite=Lax;domain=.' + dMs[j] + ';';
			// }
			d.cookie = '__mauuid='+u+'; expires=' + MA.cE() + '; path=/;SameSite=Lax;';
			MA.cv = {v:u,c:0,o:''};
			return MA.cv;
		},
		setAccessId: function() {
			var date = new Date();
			date.setTime(date.getTime()+(2*1000));
			var d = MA.d,dMs=MA.getCookieDomains(),j=0;
			// for (;j<dMs.length;j++) {
			// 	d.cookie = '__acuuid='+MA.ac+'; expires=' + date.toUTCString() + '; path=/;SameSite=Lax;domain=.' + dMs[j] + ';';
			// }
			d.cookie = '__acuuid='+MA.ac+'; expires=' + date.toUTCString() + '; path=/;SameSite=Lax;';
		},
		setCSId: function(cs) {
			var date = new Date();
			date.setTime(date.getTime()+(120000));
			var d = MA.d,dMs=MA.getCookieDomains(),j=0;
			// for (;j<dMs.length;j++) {
			// 	d.cookie = '__csuuid='+cs+'; expires=' + date.toUTCString() + '; path=/;;SameSite=Lax;domain=.' + dMs[j] + ';';
			// }
			d.cookie = '__csuuid='+cs+'; expires=' + date.toUTCString() + '; path=/;;SameSite=Lax;';
		},
		df: function() {
			var dl=MA.d.location,f=dl.hash,eC=MA.e,uC=decodeURIComponent,h='',nh='';
			if(f.match(/^#/)) {
				var hof;
				if(hof=/^#(.*)#li=(.+)&cs=(.+)/.exec(f)) {
					var cs = eC(uC(hof[3]));
					MA.setCSId(cs);
					h='&li='+eC(uC(hof[2]))+'&cs=' + cs;
					dl.hash= hof[1];
				} else if (hof=/^#(.*)&li=(.+)&cs=(.+)/.exec(f)) {
					var cs = eC(uC(hof[3]));
					MA.setCSId(cs);
					h = '&li=' + eC(uC(hof[2])) + '&cs=' + cs;
					dl.hash = hof[1];
				} else if (hof=/^#li=(.+)&cs=(.+)/.exec(f)) {
					var cs = eC(uC(hof[2]));
					MA.setCSId(cs);
					h='&li='+eC(uC(hof[1]))+'&cs=' + cs;
					dl.hash=nh;
				} else if (hof=/^#cl=(.+)&co=(.+)/.exec(f)) {
					h='&cl='+eC(uC(hof[1]))+'&co='+eC(uC(hof[2]));
					dl.hash=nh;
				} else if (hof = /^#li=(.+)&le=(.+)/.exec(f)) {
					h = '&cl=' + eC(uC(hof[1])) + '&le=' + eC(uC(hof[2]));
					dl.hash = nh;
				}
			}
			MA.h=h;
			return h;
		},

		gVH: function() {
			return MA.h;
		},
		gAC: function() {
			if (!MA.ac) {
				MA.ac = MA.uuid();
			}
			return MA.ac;
		},

		aE: function(e, t, f) {
			if (e.attachEvent) {
				e.attachEvent('on'+t, f);
			} else if (e.addEventListener) {
				e.addEventListener(t, f, true);
			}
			return e;
		},

		rE: function(e, t, f) {
			if (e.detachEvent) {
				e.detachEvent('on'+t, f);
			} else if (e.removeEventListener) {
				e.removeEventListener(t, f, true);
			}
			return e;
		},

		addDocsListeners: function() {
			var a=MA.d.getElementsByTagName('a'),l=a.length;
			for (var i=0;i<l;i++) {
				MA.aE(a[i], 'click', MA.docsCapture);
			}
		},

		docsCapture: function(evt) {
			if (!evt) {
				evt = window.event;
			}
			var types = ['xls','pdf','doc','zip', 'ppt', 'pptx'];
			var ext,i,href,e;

			if (evt.srcElement) {
				href=evt.srcElement.href;
			}else if(evt.currentTarget){
				href=evt.currentTarget.href;
			}
			if (typeof(href)!=='undefined'&&href&&href!=='') {
				if(e=/^.+\.(.+)$/.exec(href)) {
					ext = e[1].toLowerCase();
					for(i=0;i<types.length;i++) {
						if(types[i]===ext) {
							try {
								//https://bugs.webkit.org/show_bug.cgi?id=14828 & 19922
								MA.captureDownload(href);
							} catch (e) {}
							break;
						}
					}
				}
			}
		},

		isIE: function() {
			return '\v' == 'v';
		},

		isChrome: function() {
			return !!window.chrome;
		},

		isSafari: function() {
			return navigator.userAgent.toLowerCase().indexOf('safari') > 0
		},

		captureComplete: function(fun) {
			if (fun && MA[fun]) {
				if (arguments.length < 2) {
					MA[fun]();
				} else {
					MA[fun].apply(MA, Array.prototype.slice.call(arguments, 1));
				}
			}
		},

		initFormMap: function() {
			var forms=MA.d.getElementsByTagName('FORM'),i=0,j=0,t,e;
			for(;i<forms.length;i++) {
				var f=forms[i];
				if (typeof(f.wfmInitialized) === 'undefined') {
					f.__MA = {
						submit: MA.wfmSubmit,
						wfmExtract: MA.wfmExtract,
						postSubmit: MA.wfmPostSubmit,
						oldOnSubmit: f.onsubmit,
						oldSubmit: f.submit,
						f: f
					};
                    f.submit = MA.wfmSubmit;
					f.onsubmit = MA.wfmOnSubmit;
					f.wfmIntialized = true;
					t=document.getElementsByTagName("INPUT");
					for(;j<t.length;j++) {
						e=t[j];
						if (e.type === 'submit'||e.type === 'image') {
							e.__ma_submitted = false;
							MA.aE(e,'click',function() {e.__ma_submitted = true;});
						}
					}
				}
			}
		},

		wfmOnSubmit: function(evt) {
			var result=true,s=this;
			if(!evt && window.event) {
				evt = window.event;
			}

			if(evt) {
				var f = evt.target || evt.srcElement;
				if(f) {
					try {
						evt.preventDefault();
						evt.stopPropagation();
						window.event = null;
					}catch(e) {
						evt.returnValue = false;
					}

					if(f.__MA.oldOnSubmit) {
						try {
							result = f.__MA.oldOnSubmit(evt);
						}catch(e) {}
					}

					if(result) {
						this.submitTimer = window.setTimeout(function() { f.__MA.submit.call(f); }, 0);
					}
				}
			} else if (this && this.__MA && this.__MA.oldOnSubmit) {
                //if they had an onsubmit and it is successful (a la validation), then continue submitting the form.
				if (s.__MA.oldOnSubmit()) {
					this.submitTimer = window.setTimeout(function() { s.__MA.submit.call(s); }, 0);
				}
			}
		},

		wfmSubmit: function() {
			if (typeof(this.wfmCaptured) !== 'undefined' && this.wfmCaptured === true) {
				return true;
			}
			var t='script',s=MA.d.createElement(t),_this = this,ov = MA.getVisitorId(),p;
			MA.aE(s,'load',function(){ _this.__MA.postSubmit.call(_this)});
			this.timeout_timer=window.setTimeout(function(){_this.__MA.postSubmit.call(_this);}, 3000);
			s.src=MA.b()+'wfm.php?p='+MA.p+'&uq='+ov.v+'&c='+ov.c+'&l='+MA.e(MA.d.location.href)+'&'+this.__MA.wfmExtract.call(this).join('&')+'&t='+MA.dt.getTime();
			s.type = 'text/java'+t;
			p=MA.d.getElementsByTagName(t)[0];p.parentNode.insertBefore(s,p);
			this.wfmCaptured = true;
		},

		wfmExtract: function() {
			var data=[],i=0,idBlacklist=['__EVENTARGUMENT', '__VIEWSTATE', '__VIEWSTATEGENERATOR', '__EVENTTARGET', '__EVENTVALIDATION', 'card-number', 'ccPaymentDS.ccpayment_ROW0_ccHandle','l','c','uq','p'],blnCollect,u=encodeURIComponent,d='undefined',e,n;
			while(i<this.elements.length) {
				blnCollect = true;
				e=this.elements[i];
				if(e.name||e.id) {
					for(var j=0;j<idBlacklist.length;j++) {
						if(e.id) {
							if(idBlacklist[j] === e.id) {
								blnCollect = false;
								break;
							}
						}
						if(e.name) {
							if(idBlacklist[j] === e.name) {
								blnCollect = false;
								break;
							}
						}
					}
				}
				if(blnCollect) {
					n=u(e.name);
					switch(e.nodeName) {
						case "INPUT":
							switch (e.type) {
								case 'text':
								case 'email':
								case 'hidden':
								case 'date':
								case 'datetime':
								case 'datetime-local':
								case 'month':
								case 'number':
								case 'range':
								case 'search':
								case 'tel':
								case 'time':
								case 'url':
								case 'week':
									data.push(n+"="+u(e.value));
									break;
								case 'checkbox':
									if(e.checked) {
										data.push(n+"="+u(e.value));
									}else{
										data.push(n+"=");
									}
									break;
								case 'radio':
									if(e.checked) {
										data.push(n+"="+u(e.value));
									}
									break;
								default:
									break;
							}
							break;
						case "SELECT":
							if (typeof(e.selectedIndex)!==d&& e.options&&e.options[e.selectedIndex]&&typeof(e.options[e.selectedIndex].value)!==d) {
								data.push(n+"="+e.options[e.selectedIndex].value);
							}
							break;
						case 'TEXTAREA':
							if (typeof(e.name)!==d) {
								data.push(n+"="+e.value);
							}
							break;
						default:
							break;
					}
				}
				i++;
			}
			return data;
		},

		wfmPostSubmit: function() {
			if (this.submitTimer) {
				window.clearTimeout(this.submitTimer);
			}
			window.clearTimeout(this.timeout_timer); //formObj
			if (typeof(this.__MA.oldSubmit !== "undefined") && typeof(this.__MA.oldSubmit.type)==="undefined" && typeof(this.__MA.oldSubmit === "function")) {
				this.submit = this.__MA.oldSubmit;
				this.onsubmit = this.__MA.oldOnSubmit;
				var sbm_btn=false,cE;
				var i,j;
				for(i=0;i<this.elements.length;i++) {
					cE=this.elements[i];
					if(cE.type&&cE.type==='submit'&&cE.__ma_submitted) {
						sbm_btn=cE;
						break;
					}
				}
				if(!sbm_btn) {
					for(i=0,j=document.getElementsByTagName('input');i<j.length;i++) {
						if(j[i].type && j[i].type === 'image' && j[i].__ma_submitted) {
							sbm_btn = j[i];
							break;
						}
					}
				}
				if(sbm_btn) {
					try {
						var event = document.createEvent('MouseEvents');
						event.initMouseEvent('click',true,true,window,1,0,0,0,0,false,false,false,false,0,null);
						sbm_btn.dispatchEvent(event);
					}catch(e) {
						//it's ie
						sbm_btn.fireEvent('onclick');
					}
					try {
						var old_name=sbm_btn.name,old_id=sbm_btn.id,old_value=sbm_btn.value,dCE=document.createElement,fksub,fksubX,fksubY;
						if(!MA.isIE()) {
							var iP="<input type='hidden' value='";
							fksub = dCE(iP + old_value + "' name='" + old_name + "' id='" + old_id + "'>");
							this.appendChild(fksub);
							if(sbm_btn.type === 'image') {
								fksubX = dCE(iP+"0' name='" + old_name + ".x' id='" + old_id + ".x'>");
								this.appendChild(fksubX);
								fksubY = dCE(iP+"0' name='" + old_name + ".y' id='" + old_id + ".y'>");
								this.appendChild(fksubY);
							}
						}else{
							fksub = dCE("INPUT");
							fksub.type = 'hidden';
							fksub.value = old_value;
							fksub.name = old_name;
							fksub.id = old_id;
							this.appendChild(fksub);
							if(sbm_btn.type === 'image') {
								fksubX = dCE("INPUT");
								fksubX.type = 'hidden';
								fksubX.value = 0;
								fksubX.name = old_name + 'x';
								fksubX.id = old_id + 'x';
								this.appendChild(fksubX);
								fksubY = dCE("INPUT");
								fksubY.type = 'hidden';
								fksubY.value = 0;
								fksubY.name = old_name + 'y';
								fksubY.id = old_id + 'y';
								this.appendChild(fksubY);
							}
						}
					}catch(e) {}
				}
				//only if it's ie, and only if it's a .net form and only if onclick is defined for a submit button, then click it. work around for p=3895
				if (MA.isIE() && typeof(this.__VIEWSTATE) !== 'undefined' && typeof(sbm_btn.onclick) !== 'undefined') {
					sbm_btn.click();
				} else {
					this.submit();
				}
			} else {
				this.onsubmit = function(){};
				this.submit.click();
			}
			return true;
		},

		uuid: function() {
			var j=[],a='0123456789abcdef'.split(''),n=Math.random,r,i,k,p=MA.p+'',ps=p.split("");
			j[8]=j[13]=j[18]=j[23]='-';
			j[14]='4';
			for (k=0;k<ps.length;k++) {
				j[24+k]=ps[k];
			}
			j[24+k]='f';
			for (i=0;i<36;i++){
				if (!j[i]){
					r=0|n()*16;
					j[i]=a[(i===19)?(r&0x3)|0x8:r&0xf];
				}
			}
			return j.join('');
		},

		populateMAUUIDs: function(d) {
			if (getCookieByKey("__macapture") !== "false") {
				var df = d || document, e = df.getElementsByName('__mauuid'), i = 0, v = MA.getVisitorId(),
					nN = 'nodeName';
				for (; i < e.length; i++) {
					var r = e[i];
					if (r && r[nN] && r[nN] === 'INPUT' && r.type && r.type === 'hidden') {
						r.value = v.v;
					}
				}
			}
		},

		addMAForm: function(formId, hostDomain) {
			var url = "forms.net-results.io";
			var ac='',t,p,d=MA.d,v=MA.getVisitorId(),uq='&uq='+v.v;
			if (formId && typeof(formId) === 'string' && formId.length === 36) {
				t=d.createElement("script");
				try {
					ac = MA.gAC();
				} catch (e) {}
				if((!(MA.s === 's')) && typeof(hostDomain) === 'string' && hostDomain.length > 0) {
					url = hostDomain;
				}
				t.type = "text/javascript";
				t.src = 'http' + MA.s + '://'+url+'/' + formId + '/form_elements.js?ac=' + ac + uq + MA.h;
				p=d.getElementsByTagName("script")[0];
				p.parentNode.insertBefore(t,p);
			}
		},

		attachWistiaVideos: function () {
			window._wq = window._wq || [];
			_wq.push({
				"_all": function (v) {
					var r=[1,25,50,75,100],
						i=0,
						d=function(s,v) {return Math.round((s / Math.floor(v.duration())) * 100);};
					for (;i<r.length;i++) {
						(function(t,m) {
							v.bind("secondchange", function (s) {
								if (s > 0) {
									var pW = d(s, v);
									if (pW >= m) {
										MA.videoSubmit(2, t, v.name());
										return this.unbind;
									}
								}
							});
						}(i + 1, r[i]));
					}
				}
			});
		},

		checkForYouTubeVideos: function () {
			try {
				MA.d.querySelector && MA.d.querySelector('iframe[src*="youtube.com/embed"]') && MA.attachYouTubeVideos();
			} catch (e) {}
		},

		youTubeReady: function() {
			var em = MA.d.querySelectorAll('iframe[src*="youtube.com/embed"]'), i = 0, src, frameReady = function (pI) {
				var currentPlayer;
				if (pI.elm.id) {
					currentPlayer = YT.get(pI.elm.id);
				}
				if (!currentPlayer) {
					currentPlayer = new YT.Player(pI.elm);
				}
				currentPlayer.addEventListener('onReady', function (e) {
					pI.onReady.call(pI, e)
				});
				currentPlayer.addEventListener('onStateChange', function (e) {
					pI.onStateChange.call(pI, e)
				});
				pI.player = currentPlayer;
			};
			for (; i < em.length; i++) {
				src = em[i].getAttribute('src');
				var pI = new this.maPlayerInfo(em[i]);
				if (src.indexOf('enablejsapi') === -1) {
					var pf = '&';
					if (src.indexOf('?') === -1) {
						pf = '?';
					}
					em[i].onload = (function (pI) {
						return function () {
							frameReady(pI);
						};
					})(pI);
					em[i].src = src + pf + 'enablejsapi=1';
				} else {
					frameReady(pI);
				}
			}
		},

		maPlayerInfo: function (elm) {
			this.elm = elm;
			this.timer = null;
			this.milestone = -1;
			this.milestones = [1, 25, 50, 75, 100];
			this.onReady = function (e) {
				this.title = e.target.getVideoData()['title'].substring(0, 255);
				this.duration = Math.ceil(e.target.getDuration());
			};
			this.onStateChange = function (e) {
				var maP = this;
				if (e.data === YT.PlayerState.PLAYING) {
					maP.timer && window.clearInterval(maP.timer);
					maP.timer = window.setInterval(function () {
						maP.monitorMilestones.call(maP);
					}, 500);
				} else {
					maP.timer && window.clearInterval(maP.timer);
					maP.timer = null;
					if (e.data === YT.PlayerState.ENDED && this.milestone !== 4) {
						MA.videoSubmit(3, 5, this.title);
					}
				}
			};
			this.monitorMilestones = function () {
				var t=this;
				if (t.hasOwnProperty('player') && typeof(t.player.getCurrentTime) === 'function') {
					var dur = Math.round((t.player.getCurrentTime() / t.duration) * 100), i = 0;
					for (; i < t.milestones.length; i++) {
						if (i <= t.milestone) {
							continue;
						}
						if (dur >= t.milestones[i]) {
							if (i > t.milestone) {
								t.milestone = i;
								MA.videoSubmit(3, i + 1, t.title);
								if (t.milestone === t.milestones.length - 1 && t.timer) {
									window.clearInterval(t.timer);
									this.timer = null;
								}
							}
						} else {
							break;
						}
					}
				} else {
					console && console.log && console.log('player has incorrect API', t.player);
					t.timer && window.clearInterval(t.timer);
					this.timer = null;
				}
			};
		},

		attachYouTubePlayerReady: function() {
			var t=this;
			if (typeof(window.onYouTubePlayerAPIReady) === 'undefined') {
				window.onYouTubePlayerAPIReady = function() {
					t.youTubeReady();
				};
			}
		},

		attachYouTubeVideos: function () {
			var t=this;
			t.attachYouTubePlayerReady();
			if (!MA.d.querySelector('script[src*="youtube.com/iframe_api"]')) {
				t.insertYouTubeIframeApiTag();
			} else if (typeof(window.YT) !== 'undefined') {
				t.youTubeReady();
			}
			return true;
		},

		insertYouTubeIframeApiTag: function () {
			var tag = MA.d.createElement('script'), bf = MA.d.getElementsByTagName('script')[0];
			tag.src = "https://www.youtube.com/iframe_api";
			bf.parentNode.insertBefore(tag, bf);
		},

		checkForVimeoVideos: function () {
			try {
				MA.d.querySelector && MA.d.querySelector('iframe[src*="player.vimeo.com/video"]') && MA.attachVimeoVideos();
			} catch (e) {}
		},

		attachVimeoVideos: function () {
			var t=this;
			if (!MA.d.querySelector('script[src*="player.vimeo.com/api/player.js"]')) {
				t.insertVimeoScriptTag();
			} else if (typeof(window.Vimeo) !== 'undefined') {
				t.vimeoReady();
			}
			return true;
		},

		insertVimeoScriptTag: function () {
			var t=this;
			var tag = MA.d.createElement('script'), bf = MA.d.getElementsByTagName('script')[0];
			tag.onload = function () {
				if (typeof(window.Vimeo) !== 'undefined') {
					t.vimeoReady();
				}
			};
			tag.src = "https://player.vimeo.com/api/player.js";
			bf.parentNode.insertBefore(tag, bf);
		},

		vimeoReady: function() {
			var em = MA.d.querySelectorAll('iframe[src*="player.vimeo.com/video"]'), i = 0, vimeoFrameReady = function (pI) {
				var currentPlayer;
				if (!currentPlayer) {
					currentPlayer = new Vimeo.Player(pI.elm);
				}
				currentPlayer.getVideoTitle().then(function(title) {
					pI.title =  title;
				});
				currentPlayer.on('timeupdate', function (e) {
					pI.monitorMilestones.call(pI, (e.percent*100));
				});
				pI.player = currentPlayer;
			};
			for (; i < em.length; i++) {
				var pI = new this.vimeoPlayerInfo(em[i]);
				vimeoFrameReady(pI);
			}
		},

		vimeoPlayerInfo: function (elm) {
			this.elm = elm;
			this.timer = null;
			this.milestone = -1;
			this.milestones = [0, 25, 50, 75, 100];
			this.monitorMilestones = function (percent) {
				var t=this;
				for (var i = 0; i < t.milestones.length; i++) {
					if (i <= t.milestone) {
						continue;
					}
					if (percent >= t.milestones[i]) {
						if (i > t.milestone) {
							t.milestone = i;
							MA.videoSubmit(4, i + 1, t.title);
						}
					} else {
						break;
					}
				}
			};
		},

		checkForVidyardVideos: function () {
			try {
				MA.d.querySelector('script[src*="//play.vidyard.com"]') && MA.attachVidYardVideos();
			} catch (e) {}
		},

		attachVidYardVideos: function () {
			var t=this;
			t.insertVidyardScripts();
			return true;
		},

		insertVidyardScripts: function () {
			var t=this;
			var tag = MA.d.createElement('script'), bf = MA.d.getElementsByTagName('script')[0];
			var eventTag = MA.d.createElement('script'), ff = MA.d.getElementsByTagName('script')[0];
			tag.onload = function () {
				if (typeof(window.Vidyard) !== 'undefined') {
					t.vidyardReady();
				}
			};
			tag.src = "//play.vidyard.com/embed/v4.js";
			bf.parentNode.insertBefore(tag, bf);
			eventTag.src = "//play.vidyard.com/v1/progress-events.js";
			bf.parentNode.insertBefore(eventTag, ff);
		},

		vidyardReady: function() {
			window.onVidyardAPI = (vidyardEmbed) => {
				vidyardEmbed.api.addReadyListener((_, player) => {
					var pI = new VidyardV4.api.getPlayersByUUID(player.uuid), vidyardFrameReady = function (pI) {
						VidyardProgressEvents(function (result) {
							pI.title = pI[0].metadata.name;
							var milestones = [0, 25, 50, 75, 100];
							var milestone = milestones.indexOf(result.event);
							MA.videoSubmit(5, milestone + 1, pI.title);
						}, [0, 25, 50, 75, 100]);
					}
					vidyardFrameReady(pI);
				}, )
			}
		},

		videoSubmit: function (t, m, n) {
            if (getCookieByKey("__macapture") !== "false") {
                var i = new Image(1, 1);
                i.onload = i.onerror = MA.gNdN;
                i.src = MA.b() + 'video.php?p=' + MA.p + '&v=' + MA.getVisitorId().v + '&t=' + t + '&m=' + m + '&n=' + MA.e(n) + '&l=' + MA.e(MA.d.location.href) + '&ac=' + MA.gAC() + '&r=' + Math.random();
            }
        }
	};

	return {
		beginCapture: MA.beginCapture,
		doCapture: MA.doCapture,
		captureDownload: MA.captureDownload,
		aE: MA.aE,
		addDocsListeners: MA.addDocsListeners,
		docsCapture: MA.docsCapture,
		captureComplete: MA.captureComplete,
		wfmOnSubmit: MA.wfmOnSubmit,
		wfmSubmit: MA.wfmSubmit,
		initFormMap: MA.initFormMap,
		populateMAUUIDs: MA.populateMAUUIDs,
		getVisitorId: MA.getVisitorId,
		gVH: MA.gVH,
		gAC:MA.gAC,
		addMAForm:MA.addMAForm,
		attachWistiaVideos: MA.attachWistiaVideos,
		checkForYouTubeVideos: MA.checkForYouTubeVideos,
		checkForVimeoVideos: MA.checkForVimeoVideos,
		checkForVidyardVideos: MA.checkForVidyardVideos,
		resetCookieId: MA.resetCookieId,
		setVisitorId: MA.setVisitorId,
		setAccessId: MA.setAccessId
	}
}());

function userAgentIsBot(filterGeneric) {
    filterGeneric = filterGeneric || false;
    var agent = window.navigator.userAgent;
    if (agent) {
        agent = agent.toLowerCase();
        var genericTerms = ["bot", "spider", "crawler"]; // Base terms to search for. May hit real agents (e.g. spidermonkey)
        var specificTerms = [
            "googlebot", "bingbot", "slurp", "duckduckbot", "baiduspider",
            "yandexbot", "exabot", "sogou", "facebot", "ia_archiver",
            "pinterest", "mediapartners-google", "mj12bot", "majestic12", "google favicon",
            "proximic", "slackbot-linkexpanding", "twitterbot", "360spider", "admantx",
            "tweetmemebot", "opensiteexplorer", "comscore", "grapeshot", "bingpreview",
            "exalead", "surveybot", "meanpath", "genieo", "evaliant"
        ];
        if (filterGeneric) {
            specificTerms.push(genericTerms);
        }
        var isBot = false;
        for (var i = 0; i < specificTerms.length; i++) {
            if (agent.indexOf(specificTerms[i]) >= 0) {
                isBot = true;
                break;
            }
        }
        return isBot;
    }
    return false; // No way to tell, assume its a person.
}

(function () {
    if (typeof(window.CustomEvent) !== "function") {
        function CustomEvent(event, params) {
            params = params || { bubbles: false, cancelable: false, detail: undefined };
            var evt = document.createEvent("CustomEvent");
            evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
            return evt;
        }
        CustomEvent.prototype = window.Event.prototype;
        window.CustomEvent = CustomEvent;
    }
}());

function getCookieByKey(key) {
	var crumbs = document.cookie ? document.cookie.split("; ") : [];
	for (var i = 0; i < crumbs.length; i++) {
        // "=" is a valid character in a cookie value according to RFC6265, so we can't just split.
        var sepIdx = crumbs[i].indexOf("=");
        // IE omits the "=" when the cookie value is an empty string.
        sepIdx = sepIdx < 0 ? crumbs[i].length : sepIdx;
        if (crumbs[i].substring(0, sepIdx) === key) {
        	return crumbs[i].substring(sepIdx + 1);
		}
	}
	return null;
}

($__MAready=function() {
	var w=window,u='undefined';
	if (typeof($__MA)===u) {
		return setTimeout($__MAready,0);
	} else {
		if (typeof(w.MAdoCapture)===u||w.MAdoCapture){$__MA.beginCapture()}
		if (typeof(w.MAdocsCapture)===u||w.MAdocsCapture){$__MA.addDocsListeners()}
		if (typeof(w.MApopulateMAUUIDs)===u||w.MApopulateMAUUIDs){$__MA.populateMAUUIDs()}
		if (typeof(w.MAdoWistia)===u||w.MAdoWistia){$__MA.attachWistiaVideos()}
		if (typeof(w.MAdoYouTube)===u||w.MAdoYouTube){$__MA.checkForYouTubeVideos()}
		if (typeof(w.MAdoVimeo)===u||w.MAdoVimeo){$__MA.checkForVimeoVideos()}
		if (typeof(w.MAdoVidyard)===u||w.MAdoVidyard){$__MA.checkForVidyardVideos()}
        if (typeof(window.CustomEvent) === "function") {
            document.dispatchEvent(new CustomEvent("maready", {
                detail: {
                    visitorId: ($__MA.getVisitorId() || {}).v
                }
            }))
        }
	}
})();
