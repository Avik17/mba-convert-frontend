import { useState, useMemo, useCallback, useEffect } from "react";

const C = [
  {id:1,n:"IIM Ahmedabad",t:1,f:2800000,a:3500000,c:{G:99.20,O:93.50,E:95.00,S:85.00,T:75.00,P:70.00},w:{c:25,p:40,wt:10,ac:15,wx:10},s:400,ps:"AWT+PI"},
  {id:2,n:"IIM Bangalore",t:1,f:2525000,a:3592000,c:{G:99.12,O:92.30,E:95.00,S:85.00,T:70.00,P:70.00},w:{c:25,p:40,wt:10,ac:15,wx:10},s:480,ps:"WAT+PI"},
  {id:3,n:"IIM Calcutta",t:1,f:2700000,a:3500000,c:{G:99.07,O:90.50,E:94.00,S:80.00,T:70.00,P:65.00},w:{c:30,p:36,wt:10,ac:14,wx:10},s:480,ps:"WAT+PI"},
  {id:4,n:"IIM Lucknow",t:1,f:2100000,a:3100000,c:{G:97.50,O:87.00,E:92.00,S:78.00,T:65.00,P:60.00},w:{c:30,p:30,wt:10,ac:20,wx:10},s:500,ps:"WAT+PI"},
  {id:5,n:"IIM Kozhikode",t:1,f:2200000,a:3000000,c:{G:97.25,O:87.00,E:92.00,S:75.00,T:62.00,P:58.00},w:{c:28,p:32,wt:20,ac:10,wx:10},s:480,ps:"WAT+PI"},
  {id:6,n:"IIM Indore",t:1,f:2100000,a:2600000,c:{G:97.00,O:85.00,E:90.00,S:72.00,T:55.00,P:55.00},w:{c:40,p:45,wt:0,ac:10,wx:5},s:560,ps:"PI Only"},
  {id:7,n:"IIM Rohtak",t:2,f:1800000,a:2000000,c:{G:95.50,O:83.00,E:88.00,S:70.00,T:55.00,P:50.00},w:{c:40,p:30,wt:10,ac:15,wx:5},s:240,ps:"WAT+PI"},
  {id:8,n:"IIM Udaipur",t:2,f:1900000,a:1800000,c:{G:93.25,O:82.00,E:87.00,S:68.00,T:52.00,P:48.00},w:{c:52,p:20,wt:0,ac:10,wx:10},s:240,ps:"PI (JAP)"},
  {id:9,n:"IIM Trichy",t:2,f:1800000,a:1900000,c:{G:94.00,O:82.00,E:88.00,S:68.00,T:52.00,P:48.00},w:{c:52,p:20,wt:0,ac:10,wx:10},s:200,ps:"PI (JAP)"},
  {id:10,n:"IIM Ranchi",t:2,f:1700000,a:1800000,c:{G:94.00,O:82.00,E:88.00,S:68.00,T:52.00,P:48.00},w:{c:52,p:20,wt:0,ac:10,wx:10},s:220,ps:"PI (JAP)"},
  {id:11,n:"IIM Raipur",t:2,f:1600000,a:1700000,c:{G:93.00,O:80.00,E:86.00,S:65.00,T:50.00,P:45.00},w:{c:52,p:20,wt:0,ac:10,wx:10},s:240,ps:"PI (JAP)"},
  {id:12,n:"IIM Kashipur",t:2,f:1600000,a:1600000,c:{G:93.00,O:80.00,E:86.00,S:65.00,T:50.00,P:45.00},w:{c:52,p:20,wt:0,ac:10,wx:10},s:220,ps:"PI (JAP)"},
  {id:13,n:"IIM Vizag",t:2,f:1400000,a:1500000,c:{G:92.50,O:78.00,E:85.00,S:63.00,T:48.00,P:43.00},w:{c:50,p:25,wt:5,ac:10,wx:10},s:180,ps:"WAT+PI"},
  {id:14,n:"IIM Bodh Gaya",t:2,f:1350000,a:1400000,c:{G:90.50,O:76.00,E:83.00,S:60.00,T:45.00,P:40.00},w:{c:50,p:25,wt:5,ac:10,wx:10},s:180,ps:"CAP"},
  {id:15,n:"IIM Nagpur",t:2,f:1400000,a:1350000,c:{G:90.00,O:76.00,E:83.00,S:60.00,T:45.00,P:40.00},w:{c:50,p:20,wt:5,ac:15,wx:10},s:180,ps:"WAT+PI"},
  {id:16,n:"IIM Sambalpur",t:3,f:1300000,a:1200000,c:{G:88.50,O:74.00,E:80.00,S:55.00,T:40.00,P:38.00},w:{c:50,p:25,wt:5,ac:10,wx:10},s:170,ps:"CAP"},
  {id:17,n:"IIM Shillong",t:2,f:1500000,a:1400000,c:{G:90.00,O:76.00,E:83.00,S:60.00,T:45.00,P:40.00},w:{c:48,p:22,wt:10,ac:10,wx:10},s:180,ps:"WAT+PI"},
  {id:18,n:"IIM Sirmaur",t:3,f:1200000,a:1100000,c:{G:85.00,O:70.00,E:78.00,S:50.00,T:35.00,P:35.00},w:{c:50,p:25,wt:5,ac:10,wx:10},s:120,ps:"CAP"},
  {id:19,n:"IIM Jammu",t:3,f:1300000,a:1200000,c:{G:88.00,O:74.00,E:80.00,S:55.00,T:40.00,P:38.00},w:{c:50,p:25,wt:5,ac:10,wx:10},s:170,ps:"CAP"},
  {id:20,n:"IIM Amritsar",t:3,f:1350000,a:1250000,c:{G:88.00,O:74.00,E:80.00,S:55.00,T:40.00,P:38.00},w:{c:50,p:25,wt:5,ac:10,wx:10},s:170,ps:"WAT+PI"},
  {id:21,n:"FMS Delhi",t:1,f:192000,a:3200000,c:{G:98.50,O:90.00,E:94.00,S:80.00,T:68.00,P:60.00},w:{c:50,p:30,wt:0,ac:10,wx:10},s:216,ps:"GD+PI"},
  {id:22,n:"JBIMS Mumbai",t:1,f:500000,a:3000000,c:{G:98.20,O:88.00,E:93.00,S:78.00,T:65.00,P:58.00},w:{c:60,p:20,wt:0,ac:15,wx:5},s:120,ps:"GD+PI"},
  {id:23,n:"SPJIMR Mumbai",t:1,f:2100000,a:3200000,c:{G:96.00,O:86.00,E:90.00,S:75.00,T:60.00,P:55.00},w:{c:60,p:25,wt:0,ac:15,wx:0},s:240,ps:"GD+PI"},
  {id:24,n:"MDI Gurgaon",t:1,f:2400000,a:2600000,c:{G:96.50,O:85.00,E:90.00,S:72.00,T:58.00,P:52.00},w:{c:40,p:30,wt:10,ac:15,wx:5},s:360,ps:"GD+PI+WAT"},
  {id:25,n:"IIFT Delhi",t:1,f:2200000,a:2700000,c:{G:96.00,O:85.00,E:90.00,S:70.00,T:55.00,P:50.00},w:{c:50,p:25,wt:10,ac:10,wx:5},s:250,ps:"GD+PI+WAT"},
  {id:26,n:"XLRI Jamshedpur",t:1,f:2600000,a:3000000,c:{G:96.00,O:86.00,E:90.00,S:72.00,T:58.00,P:50.00},w:{c:40,p:35,wt:5,ac:15,wx:5},s:180,ps:"GD+PI"},
  {id:27,n:"IIT Bombay (SJMSOM)",t:1,f:1100000,a:2800000,c:{G:97.00,O:88.00,E:92.00,S:78.00,T:62.00,P:55.00},w:{c:45,p:30,wt:5,ac:15,wx:5},s:120,ps:"PI"},
  {id:28,n:"IIT Delhi (DMS)",t:1,f:1000000,a:2500000,c:{G:96.00,O:86.00,E:90.00,S:75.00,T:60.00,P:52.00},w:{c:45,p:30,wt:5,ac:15,wx:5},s:80,ps:"GD+PI"},
  {id:29,n:"IIT Kharagpur (VGSoM)",t:2,f:1200000,a:2200000,c:{G:94.00,O:84.00,E:88.00,S:70.00,T:55.00,P:48.00},w:{c:45,p:30,wt:5,ac:15,wx:5},s:100,ps:"GD+PI"},
  {id:30,n:"IIT Madras (DoMS)",t:2,f:1000000,a:2000000,c:{G:95.00,O:85.00,E:89.00,S:72.00,T:56.00,P:50.00},w:{c:50,p:25,wt:5,ac:15,wx:5},s:60,ps:"PI"},
  {id:31,n:"IIT Kanpur (DoMS)",t:2,f:900000,a:1800000,c:{G:93.00,O:82.00,E:87.00,S:68.00,T:50.00,P:45.00},w:{c:50,p:25,wt:5,ac:15,wx:5},s:60,ps:"PI"},
  {id:32,n:"IIT Roorkee (DoMS)",t:2,f:850000,a:1700000,c:{G:92.00,O:80.00,E:85.00,S:65.00,T:48.00,P:42.00},w:{c:50,p:25,wt:5,ac:15,wx:5},s:50,ps:"PI"},
  {id:33,n:"IMI Delhi",t:2,f:2100000,a:1800000,c:{G:92.00,O:80.00,E:85.00,S:65.00,T:50.00,P:45.00},w:{c:50,p:25,wt:5,ac:15,wx:5},s:300,ps:"GD+PI"},
  {id:34,n:"IMT Ghaziabad",t:2,f:2000000,a:1700000,c:{G:92.00,O:80.00,E:85.00,S:65.00,T:50.00,P:45.00},w:{c:55,p:20,wt:5,ac:15,wx:5},s:440,ps:"GD+PI"},
  {id:35,n:"MICA Ahmedabad",t:2,f:2200000,a:1600000,c:{G:91.00,O:78.00,E:84.00,S:62.00,T:48.00,P:42.00},w:{c:40,p:30,wt:10,ac:10,wx:10},s:180,ps:"GE+PI"},
  {id:36,n:"NITIE Mumbai",t:2,f:1200000,a:2300000,c:{G:96.00,O:86.00,E:90.00,S:74.00,T:58.00,P:50.00},w:{c:55,p:25,wt:0,ac:15,wx:5},s:200,ps:"PI"},
  {id:37,n:"TAPMI Manipal",t:2,f:2100000,a:1500000,c:{G:90.00,O:76.00,E:82.00,S:60.00,T:45.00,P:40.00},w:{c:50,p:25,wt:5,ac:15,wx:5},s:360,ps:"GD+PI"},
  {id:38,n:"FORE School Delhi",t:2,f:1800000,a:1400000,c:{G:88.00,O:74.00,E:80.00,S:58.00,T:42.00,P:38.00},w:{c:50,p:25,wt:5,ac:15,wx:5},s:240,ps:"GD+PI"},
  {id:39,n:"GIM Goa",t:2,f:1900000,a:1300000,c:{G:87.00,O:73.00,E:79.00,S:55.00,T:40.00,P:36.00},w:{c:50,p:25,wt:5,ac:15,wx:5},s:300,ps:"GD+PI"},
  {id:40,n:"LBSIM Delhi",t:2,f:1500000,a:1200000,c:{G:86.00,O:72.00,E:78.00,S:54.00,T:38.00,P:35.00},w:{c:55,p:20,wt:5,ac:15,wx:5},s:240,ps:"GD+PI"},
  {id:41,n:"SIBM Pune",t:2,f:2000000,a:1900000,c:{G:94.00,O:82.00,E:87.00,S:68.00,T:52.00,P:46.00},w:{c:50,p:25,wt:5,ac:15,wx:5},s:240,ps:"GE-PI"},
  {id:42,n:"SCMHRD Pune",t:2,f:1900000,a:1700000,c:{G:93.00,O:80.00,E:86.00,S:65.00,T:50.00,P:44.00},w:{c:50,p:25,wt:5,ac:15,wx:5},s:180,ps:"GE-PI"},
  {id:43,n:"NMIMS Mumbai",t:2,f:2200000,a:1800000,c:{G:94.00,O:82.00,E:87.00,S:68.00,T:52.00,P:46.00},w:{c:55,p:25,wt:0,ac:15,wx:5},s:420,ps:"GD+PI"},
  {id:44,n:"Great Lakes Chennai",t:2,f:1900000,a:1400000,c:{G:88.00,O:74.00,E:80.00,S:58.00,T:42.00,P:38.00},w:{c:50,p:25,wt:5,ac:15,wx:5},s:420,ps:"PI"},
  {id:45,n:"IRMA Anand",t:2,f:1000000,a:1200000,c:{G:85.00,O:72.00,E:78.00,S:55.00,T:40.00,P:36.00},w:{c:40,p:30,wt:10,ac:10,wx:10},s:180,ps:"GD+PI"},
  {id:46,n:"TISS Mumbai (HRM)",t:2,f:400000,a:1800000,c:{G:94.00,O:82.00,E:87.00,S:68.00,T:52.00,P:46.00},w:{c:45,p:30,wt:5,ac:15,wx:5},s:60,ps:"GD+PI"},
  {id:47,n:"KJ Somaiya Mumbai",t:3,f:1800000,a:1300000,c:{G:85.00,O:72.00,E:78.00,S:55.00,T:40.00,P:36.00},w:{c:55,p:25,wt:0,ac:15,wx:5},s:300,ps:"GD+PI"},
  {id:48,n:"BIMTECH Greater Noida",t:3,f:1500000,a:1100000,c:{G:82.00,O:68.00,E:75.00,S:50.00,T:36.00,P:32.00},w:{c:50,p:25,wt:5,ac:15,wx:5},s:360,ps:"GD+PI"},
  {id:49,n:"IFMR Chennai",t:3,f:1500000,a:1100000,c:{G:80.00,O:66.00,E:73.00,S:48.00,T:34.00,P:30.00},w:{c:50,p:25,wt:5,ac:15,wx:5},s:240,ps:"GD+PI"},
  {id:50,n:"LIBA Chennai",t:3,f:1200000,a:1000000,c:{G:80.00,O:66.00,E:73.00,S:48.00,T:34.00,P:30.00},w:{c:50,p:25,wt:5,ac:15,wx:5},s:200,ps:"GD+PI"},
  {id:51,n:"XIMB Bhubaneswar",t:2,f:1600000,a:1600000,c:{G:93.00,O:80.00,E:86.00,S:65.00,T:50.00,P:44.00},w:{c:50,p:25,wt:5,ac:15,wx:5},s:180,ps:"GD+PI"},
  {id:52,n:"DoMS IISc Bangalore",t:2,f:600000,a:2200000,c:{G:96.00,O:86.00,E:90.00,S:74.00,T:58.00,P:50.00},w:{c:50,p:30,wt:0,ac:15,wx:5},s:30,ps:"PI"},
  {id:53,n:"IIT BHU (DoMS)",t:2,f:800000,a:1500000,c:{G:91.00,O:78.00,E:84.00,S:62.00,T:48.00,P:42.00},w:{c:50,p:25,wt:5,ac:15,wx:5},s:50,ps:"GD+PI"},
  {id:54,n:"NIT Trichy (DoMS)",t:3,f:500000,a:1200000,c:{G:88.00,O:74.00,E:80.00,S:58.00,T:42.00,P:38.00},w:{c:55,p:20,wt:5,ac:15,wx:5},s:50,ps:"GD+PI"},
  {id:55,n:"IIFT Kakinada",t:2,f:1800000,a:1500000,c:{G:90.00,O:76.00,E:82.00,S:60.00,T:45.00,P:40.00},w:{c:50,p:25,wt:10,ac:10,wx:5},s:180,ps:"GD+PI+WAT"},
  {id:56,n:"IIM Kozhikode (Kochi)",t:2,f:2000000,a:2200000,c:{G:92.00,O:80.00,E:85.00,S:68.00,T:52.00,P:46.00},w:{c:28,p:32,wt:20,ac:10,wx:10},s:60,ps:"WAT+PI"},
  {id:57,n:"MANAGE Hyderabad",t:3,f:400000,a:900000,c:{G:78.00,O:64.00,E:71.00,S:45.00,T:32.00,P:28.00},w:{c:50,p:25,wt:5,ac:15,wx:5},s:60,ps:"GD+PI"},
  {id:58,n:"XIME Bangalore",t:3,f:1100000,a:1000000,c:{G:78.00,O:64.00,E:71.00,S:45.00,T:32.00,P:28.00},w:{c:50,p:25,wt:5,ac:15,wx:5},s:180,ps:"GD+PI"},
  {id:59,n:"Welingkar Mumbai",t:3,f:1400000,a:1100000,c:{G:82.00,O:68.00,E:75.00,S:50.00,T:36.00,P:32.00},w:{c:50,p:25,wt:5,ac:15,wx:5},s:300,ps:"GD+PI"},
  {id:60,n:"SIMSREE Mumbai",t:3,f:100000,a:1200000,c:{G:90.00,O:76.00,E:82.00,S:60.00,T:45.00,P:40.00},w:{c:60,p:20,wt:0,ac:15,wx:5},s:120,ps:"GD+PI"},
];
const CK={GEN:"G",OBC:"O",EWS:"E",SC:"S",ST:"T",PWD:"P"};
const CATS=["GEN","OBC","EWS","SC","ST","PWD"];

function predict(p,col){const cat=parseFloat(p.catPercentile)||0,ck=CK[p.category]||"G",cutoff=col.c[ck]||col.c.G,w=col.w;if(cat<cutoff)return{ch:0,v:"Below Cutoff",co:"#ef4444",comp:0,f:{}};const cm=cat-cutoff,cs=Math.min(100,50+cm*5),ac=(parseFloat(p.tenth)||70)*.25+(parseFloat(p.twelfth)||70)*.35+(parseFloat(p.graduation)||60)*.4,wm=parseInt(p.workex)||0;let ws=wm<=0?25:wm<=12?40:wm<=24?65:wm<=48?85:wm<=72?75:55;const pi=(parseInt(p.piRating)||4)/7*100,gd=(parseInt(p.gdRating)||4)/7*100,wa=(parseInt(p.watRating)||4)/7*100,psl=(col.ps||"").toLowerCase();let is;if(psl.includes("gd")&&psl.includes("wat"))is=pi*.5+gd*.25+wa*.25;else if(psl.includes("gd"))is=pi*.6+gd*.4;else if(psl.includes("wat")||psl.includes("awt"))is=pi*.7+wa*.3;else is=pi;let dv=0;if(p.gender==="Female")dv+=3;if(p.gradStream!=="Engineering")dv+=2;const comp=cs*(w.c/100)+is*((w.p+w.wt)/100)+ac*(w.ac/100)+ws*(w.wx/100)+dv;let ch;if(comp>=85)ch=92;else if(comp>=78)ch=82;else if(comp>=72)ch=70;else if(comp>=65)ch=55;else if(comp>=58)ch=40;else if(comp>=50)ch=28;else if(comp>=42)ch=18;else if(comp>=35)ch=10;else ch=5;if(["SC","ST","PWD"].includes(p.category))ch=Math.min(98,ch+12);if(["OBC","EWS"].includes(p.category))ch=Math.min(98,ch+5);ch=Math.max(2,Math.min(98,Math.round(ch)));let v,co;if(ch>=75){v="Strong Convert";co="#22c55e";}else if(ch>=55){v="Good Chance";co="#84cc16";}else if(ch>=35){v="Moderate";co="#f59e0b";}else if(ch>=20){v="Low Chance";co="#f97316";}else{v="Very Unlikely";co="#ef4444";}return{ch,v,co,comp:Math.round(comp),f:{cs:Math.round(cs),is:Math.round(is),as:Math.round(ac),ws:Math.round(ws)}};}

const TR=[
{n:"IIM Ahmedabad",t:1,a:"98.86",b:"99.05",c:"99.20",o:"93.50",s:"85.00",st:"75.00",d:"↑"},
{n:"IIM Bangalore",t:1,a:"98.50",b:"98.92",c:"99.12",o:"92.30",s:"85.00",st:"70.00",d:"↑"},
{n:"IIM Calcutta",t:1,a:"98.78",b:"99.00",c:"99.07",o:"90.50",s:"80.00",st:"70.00",d:"↑"},
{n:"IIM Lucknow",t:1,a:"96.20",b:"96.85",c:"97.50",o:"87.00",s:"78.00",st:"65.00",d:"↑"},
{n:"IIM Kozhikode",t:1,a:"96.00",b:"96.50",c:"97.25",o:"87.00",s:"75.00",st:"62.00",d:"↑"},
{n:"IIM Indore",t:1,a:"95.00",b:"96.10",c:"97.00",o:"85.00",s:"72.00",st:"55.00",d:"↑↑"},
{n:"IIM Rohtak",t:2,a:"93.50",b:"94.50",c:"95.50",o:"83.00",s:"70.00",st:"55.00",d:"↑"},
{n:"IIM Udaipur",t:2,a:"91.00",b:"92.00",c:"93.25",o:"82.00",s:"68.00",st:"52.00",d:"↑"},
{n:"IIM Trichy",t:2,a:"92.00",b:"93.00",c:"94.00",o:"82.00",s:"68.00",st:"52.00",d:"↑"},
{n:"IIM Ranchi",t:2,a:"92.00",b:"93.00",c:"94.00",o:"82.00",s:"68.00",st:"52.00",d:"↑"},
{n:"IIM Raipur",t:2,a:"91.00",b:"92.00",c:"93.00",o:"80.00",s:"65.00",st:"50.00",d:"↑"},
{n:"IIM Kashipur",t:2,a:"91.00",b:"92.00",c:"93.00",o:"80.00",s:"65.00",st:"50.00",d:"↑"},
{n:"IIM Vizag",t:2,a:"90.50",b:"91.50",c:"92.50",o:"78.00",s:"63.00",st:"48.00",d:"↑"},
{n:"IIM Bodh Gaya",t:2,a:"88.00",b:"89.50",c:"90.50",o:"76.00",s:"60.00",st:"45.00",d:"↑"},
{n:"IIM Nagpur",t:2,a:"88.00",b:"89.00",c:"90.00",o:"76.00",s:"60.00",st:"45.00",d:"↑"},
{n:"IIM Sambalpur",t:3,a:"86.50",b:"87.50",c:"88.50",o:"74.00",s:"55.00",st:"40.00",d:"↑"},
{n:"IIM Shillong",t:2,a:"88.00",b:"89.00",c:"90.00",o:"76.00",s:"60.00",st:"45.00",d:"↑"},
{n:"IIM Sirmaur",t:3,a:"83.00",b:"84.00",c:"85.00",o:"70.00",s:"50.00",st:"35.00",d:"↑"},
{n:"IIM Jammu",t:3,a:"86.00",b:"87.00",c:"88.00",o:"74.00",s:"55.00",st:"40.00",d:"↑"},
{n:"IIM Amritsar",t:3,a:"86.00",b:"87.00",c:"88.00",o:"74.00",s:"55.00",st:"40.00",d:"↑"},
{n:"FMS Delhi",t:1,a:"98.00",b:"98.30",c:"98.50",o:"90.00",s:"80.00",st:"68.00",d:"↑"},
{n:"JBIMS Mumbai",t:1,a:"97.50",b:"97.80",c:"98.20",o:"88.00",s:"78.00",st:"65.00",d:"↑"},
{n:"SPJIMR Mumbai",t:1,a:"95.00",b:"95.50",c:"96.00",o:"86.00",s:"75.00",st:"60.00",d:"↑"},
{n:"MDI Gurgaon",t:1,a:"95.00",b:"95.75",c:"96.50",o:"85.00",s:"72.00",st:"58.00",d:"↑"},
{n:"IIFT Delhi",t:1,a:"95.00",b:"95.50",c:"96.00",o:"85.00",s:"70.00",st:"55.00",d:"↑"},
{n:"XLRI Jamshedpur",t:1,a:"95.50",b:"95.80",c:"96.00",o:"86.00",s:"72.00",st:"58.00",d:"↑"},
{n:"IIT Bombay (SJMSOM)",t:1,a:"96.00",b:"96.50",c:"97.00",o:"88.00",s:"78.00",st:"62.00",d:"↑"},
{n:"IIT Delhi (DMS)",t:1,a:"95.00",b:"95.50",c:"96.00",o:"86.00",s:"75.00",st:"60.00",d:"↑"},
{n:"IIT Kharagpur (VGSoM)",t:2,a:"92.50",b:"93.50",c:"94.00",o:"84.00",s:"70.00",st:"55.00",d:"↑"},
{n:"IIT Madras (DoMS)",t:2,a:"93.50",b:"94.50",c:"95.00",o:"85.00",s:"72.00",st:"56.00",d:"↑"},
{n:"IIT Kanpur (DoMS)",t:2,a:"91.50",b:"92.50",c:"93.00",o:"82.00",s:"68.00",st:"50.00",d:"↑"},
{n:"IIT Roorkee (DoMS)",t:2,a:"90.00",b:"91.00",c:"92.00",o:"80.00",s:"65.00",st:"48.00",d:"↑"},
{n:"IMI Delhi",t:2,a:"90.50",b:"91.50",c:"92.00",o:"80.00",s:"65.00",st:"50.00",d:"↑"},
{n:"IMT Ghaziabad",t:2,a:"90.00",b:"91.00",c:"92.00",o:"80.00",s:"65.00",st:"50.00",d:"↑"},
{n:"MICA Ahmedabad",t:2,a:"89.50",b:"90.50",c:"91.00",o:"78.00",s:"62.00",st:"48.00",d:"↑"},
{n:"NITIE Mumbai",t:2,a:"95.00",b:"95.50",c:"96.00",o:"86.00",s:"74.00",st:"58.00",d:"↑"},
{n:"TAPMI Manipal",t:2,a:"88.00",b:"89.00",c:"90.00",o:"76.00",s:"60.00",st:"45.00",d:"↑"},
{n:"FORE School Delhi",t:2,a:"86.00",b:"87.00",c:"88.00",o:"74.00",s:"58.00",st:"42.00",d:"↑"},
{n:"GIM Goa",t:2,a:"85.00",b:"86.00",c:"87.00",o:"73.00",s:"55.00",st:"40.00",d:"↑"},
{n:"LBSIM Delhi",t:2,a:"84.00",b:"85.00",c:"86.00",o:"72.00",s:"54.00",st:"38.00",d:"↑"},
{n:"SIBM Pune",t:2,a:"92.50",b:"93.50",c:"94.00",o:"82.00",s:"68.00",st:"52.00",d:"↑"},
{n:"SCMHRD Pune",t:2,a:"91.50",b:"92.50",c:"93.00",o:"80.00",s:"65.00",st:"50.00",d:"↑"},
{n:"NMIMS Mumbai",t:2,a:"92.50",b:"93.50",c:"94.00",o:"82.00",s:"68.00",st:"52.00",d:"↑"},
{n:"Great Lakes Chennai",t:2,a:"86.00",b:"87.00",c:"88.00",o:"74.00",s:"58.00",st:"42.00",d:"↑"},
{n:"IRMA Anand",t:2,a:"83.00",b:"84.00",c:"85.00",o:"72.00",s:"55.00",st:"40.00",d:"↑"},
{n:"TISS Mumbai (HRM)",t:2,a:"92.50",b:"93.50",c:"94.00",o:"82.00",s:"68.00",st:"52.00",d:"↑"},
{n:"KJ Somaiya Mumbai",t:3,a:"83.00",b:"84.00",c:"85.00",o:"72.00",s:"55.00",st:"40.00",d:"↑"},
{n:"BIMTECH Greater Noida",t:3,a:"80.00",b:"81.00",c:"82.00",o:"68.00",s:"50.00",st:"36.00",d:"↑"},
{n:"IFMR Chennai",t:3,a:"78.00",b:"79.00",c:"80.00",o:"66.00",s:"48.00",st:"34.00",d:"↑"},
{n:"LIBA Chennai",t:3,a:"78.00",b:"79.00",c:"80.00",o:"66.00",s:"48.00",st:"34.00",d:"↑"},
{n:"XIMB Bhubaneswar",t:2,a:"91.50",b:"92.50",c:"93.00",o:"80.00",s:"65.00",st:"50.00",d:"↑"},
{n:"DoMS IISc Bangalore",t:2,a:"94.50",b:"95.50",c:"96.00",o:"86.00",s:"74.00",st:"58.00",d:"↑"},
{n:"IIT BHU (DoMS)",t:2,a:"89.50",b:"90.50",c:"91.00",o:"78.00",s:"62.00",st:"48.00",d:"↑"},
{n:"NIT Trichy (DoMS)",t:3,a:"86.00",b:"87.00",c:"88.00",o:"74.00",s:"58.00",st:"42.00",d:"↑"},
{n:"IIFT Kakinada",t:2,a:"88.00",b:"89.00",c:"90.00",o:"76.00",s:"60.00",st:"45.00",d:"↑"},
{n:"IIM Kozhikode (Kochi)",t:2,a:"90.50",b:"91.50",c:"92.00",o:"80.00",s:"68.00",st:"52.00",d:"↑"},
{n:"MANAGE Hyderabad",t:3,a:"76.00",b:"77.00",c:"78.00",o:"64.00",s:"45.00",st:"32.00",d:"↑"},
{n:"XIME Bangalore",t:3,a:"76.00",b:"77.00",c:"78.00",o:"64.00",s:"45.00",st:"32.00",d:"↑"},
{n:"Welingkar Mumbai",t:3,a:"80.00",b:"81.00",c:"82.00",o:"68.00",s:"50.00",st:"36.00",d:"↑"},
{n:"SIMSREE Mumbai",t:3,a:"88.00",b:"89.00",c:"90.00",o:"76.00",s:"60.00",st:"45.00",d:"↑"},
];

const WC=[{col:"IIM Indore",ch:[{p:"CAT",o:"35%",nw:"55%",d:"↑",nt:"Massive increase for 2026"},{p:"Academics",o:"59%",nw:"35%",d:"↓",nt:"10th dropped from 39% to 10%"},{p:"Work-Ex",o:"0%",nw:"3%",d:"↑",nt:"Newly added"},{p:"PI",o:"45%",nw:"45%",d:"→",nt:"Still highest PI weight"}]},{col:"IIM Bangalore",ch:[{p:"PI",o:"35%",nw:"40%",d:"↑",nt:"Increased from last year"},{p:"Graduation",o:"0%",nw:"10%",d:"↑",nt:"Reinstated"},{p:"10th/12th",o:"15% each",nw:"10% each",d:"↓",nt:"Reduced"},{p:"CAT",o:"55%",nw:"55%",d:"→",nt:"DILR 21% > VARC 19% > QA 15%"}]},{col:"IIM Calcutta",ch:[{p:"CAT+PI",o:"82%",nw:"86%",d:"↑",nt:"Controllable factors dominate"},{p:"Academics",o:"18%",nw:"14%",d:"↓",nt:"Slightly reduced"}]},{col:"MDI Gurgaon",ch:[{p:"BAT (new)",o:"0%",nw:"5%",d:"↑",nt:"Behavioral Assessment Test introduced"},{p:"Academic",o:"Higher",nw:"Reduced",d:"↓",nt:"Offset by BAT"}]},{col:"IIM Kozhikode",ch:[{p:"WAT",o:"15%",nw:"20%",d:"↑",nt:"Highest WAT weight among IIMs"},{p:"Min PI",o:"N/A",nw:"12/40",d:"↑",nt:"Must score 12+ to qualify"}]}];

const INS=[{i:"📈",t:"CAT Weight Increasing",b:"IIM Indore: 35% to 55%. Strong CAT score is more critical than ever for PI shortlisting."},{i:"🎤",t:"PI Dominates Final Selection",b:"IIM Bangalore PI: 35% to 40%. IIM Indore at 45%. IIM Calcutta controllable factors (CAT+PI) = 86%."},{i:"✍️",t:"WAT is Back & Matters More",b:"IIM Kozhikode WAT at 20% (highest). Minimum PI score of 12/40 introduced — fail PI and nothing saves you."},{i:"📊",t:"Academic Weight Declining",b:"IIM Indore academics: 59% to 35%. IIM Bangalore 10th/12th: 15% to 10% each. CAT & PI matter more than boards."},{i:"💼",t:"Work-Ex Getting Attention",b:"IIM Indore added 3% work-ex first time. MDI introduced BAT (5%). Sweet spot: 24-48 months."},{i:"🔄",t:"JAP Replaces CAP for 4 IIMs",b:"Kashipur, Raipur, Ranchi, Trichy use JAP. Normalized CAT scores, PI 20%, CAT 52%, academics 10%."},{i:"👩‍💼",t:"Gender Diversity: Small But Real",b:"Most IIMs give 2-6% bonus for female candidates. IIM Trichy: 6%. Tiebreaker in borderline cases."},{i:"🧠",t:"Non-Engineers Get Slight Edge",b:"SPJIMR and MICA value diverse backgrounds. Non-engineers often find it easier to convert newer IIMs."}];

const S = `@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap');*{margin:0;padding:0;box-sizing:border-box}:root{--bg:#0a0b0f;--c:#12141c;--ch:#181b26;--inp:#1a1d28;--br:#262a38;--ac:#6c63ff;--t1:#eef0f6;--t2:#8b90a5;--t3:#5b5f73;--gn:#22c55e;--f:'DM Sans',sans-serif;--fm:'Space Mono',monospace;--gr:linear-gradient(135deg,#6c63ff,#ff6b9d,#fbbf24)}body{background:var(--bg);color:var(--t1);font-family:var(--f)}.A{min-height:100vh}.N{position:sticky;top:0;z-index:100;background:rgba(10,11,15,.85);backdrop-filter:blur(20px);border-bottom:1px solid var(--br);padding:0 20px}.NI{max-width:1280px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;min-height:60px;flex-wrap:wrap;gap:8px;padding:6px 0}.NB{display:flex;align-items:center;gap:10px;font-weight:700;font-size:17px;cursor:pointer}.NB span{background:var(--gr);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}.BG{background:var(--ac);color:#fff;font-size:10px;font-weight:700;padding:2px 8px;border-radius:100px;-webkit-text-fill-color:#fff}.NL{display:flex;gap:4px;flex-wrap:wrap}.NLB{background:none;border:none;color:var(--t2);font:500 13px var(--f);padding:6px 12px;border-radius:8px;cursor:pointer;transition:.2s}.NLB:hover,.NLB.a{color:var(--t1);background:rgba(108,99,255,.1)}.NLB.a{color:var(--ac)}.CT{max-width:1280px;margin:0 auto;padding:28px 20px;position:relative;z-index:1}.H{text-align:center;padding:50px 0 36px}.H h1{font-size:clamp(26px,5vw,50px);font-weight:700;line-height:1.1;letter-spacing:-1.5px;margin-bottom:14px}.H h1 em{font-style:normal;background:var(--gr);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}.H p{color:var(--t2);font-size:15px;max-width:600px;margin:0 auto;line-height:1.6}.HS{display:flex;justify-content:center;gap:40px;margin-top:32px;flex-wrap:wrap}.HSN{font:700 26px var(--fm);background:var(--gr);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}.HSL{font-size:12px;color:var(--t3)}.G4{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:14px;margin-top:36px}.CD{background:var(--c);border:1px solid var(--br);border-radius:14px;padding:20px}.FG{display:grid;gap:14px;grid-template-columns:repeat(auto-fill,minmax(200px,1fr))}.FL{font-size:11px;font-weight:600;color:var(--t2);letter-spacing:.5px;text-transform:uppercase;margin-bottom:5px}.FI,.FS{background:var(--inp);border:1px solid var(--br);color:var(--t1);font:400 14px var(--f);padding:10px 12px;border-radius:9px;outline:none;width:100%;transition:.2s}.FI:focus,.FS:focus{border-color:var(--ac);box-shadow:0 0 0 3px rgba(108,99,255,.25)}.FS option{background:var(--c)}.SH{display:flex;align-items:center;gap:10px;margin-bottom:14px;padding-bottom:10px;border-bottom:1px solid var(--br)}.SI{width:32px;height:32px;border-radius:9px;display:flex;align-items:center;justify-content:center;font-size:16px;background:rgba(108,99,255,.1);color:var(--ac)}.RT{display:flex;gap:4px}.RB{flex:1;height:38px;border-radius:8px;display:flex;align-items:center;justify-content:center;cursor:pointer;border:2px solid transparent;background:var(--inp);font:600 13px var(--fm);color:var(--t3);transition:.2s}.RB:hover{border-color:var(--br)}.RB.a{border-color:var(--ac);background:rgba(108,99,255,.15);color:var(--t1)}.BP{background:var(--ac);color:#fff;font:600 14px var(--f);padding:12px 24px;border-radius:11px;border:none;cursor:pointer;display:inline-flex;align-items:center;gap:8px;transition:.2s}.BP:hover{filter:brightness(1.1);transform:translateY(-1px)}.BS{background:var(--inp);color:var(--t1);font:500 13px var(--f);padding:9px 18px;border-radius:9px;border:1px solid var(--br);cursor:pointer}.RC{background:var(--c);border:1px solid var(--br);border-radius:14px;padding:16px 20px;margin-bottom:10px;display:grid;grid-template-columns:1fr auto;align-items:center;gap:14px;cursor:pointer;transition:.2s}.RC:hover{border-color:rgba(108,99,255,.3);background:var(--ch)}.RC.x{border-color:var(--ac)}.CM{display:flex;align-items:center;gap:12px;min-width:0}.CRK{width:32px;height:32px;border-radius:9px;display:flex;align-items:center;justify-content:center;font:700 12px var(--fm);background:rgba(108,99,255,.1);color:var(--ac);flex-shrink:0}.CN{font-weight:600;font-size:14px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.TG{display:flex;gap:4px;margin-top:3px;flex-wrap:wrap}.TGI{font-size:9px;font-weight:600;padding:2px 6px;border-radius:100px}.T1{background:rgba(251,191,36,.15);color:#fbbf24}.T2{background:rgba(96,165,250,.15);color:#60a5fa}.T3{background:rgba(167,139,250,.15);color:#a78bfa}.CDI{text-align:right;min-width:90px}.CP{font:700 24px var(--fm);line-height:1}.CV{font-size:10px;font-weight:600;margin-top:2px;letter-spacing:.5px;text-transform:uppercase}.RD{grid-column:1/-1;border-top:1px solid var(--br);padding-top:14px;margin-top:8px}.DG{display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:8px}.DI{background:var(--inp);border-radius:9px;padding:9px}.DL{font-size:9px;color:var(--t3);text-transform:uppercase;letter-spacing:.5px}.DV{font:600 13px var(--f);margin-top:2px}.FR{display:flex;align-items:center;gap:8px;margin-bottom:6px}.FN{width:70px;font-size:11px;color:var(--t2)}.FBG{flex:1;height:6px;background:var(--inp);border-radius:100px;overflow:hidden}.FBF{height:100%;border-radius:100px;transition:width .5s}.FV{width:32px;text-align:right;font:700 11px var(--fm);color:var(--t2)}.BLO{position:relative}.BLC{filter:blur(6px);pointer-events:none;user-select:none}.BLT{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;z-index:10;background:rgba(10,11,15,.6);border-radius:14px}.TB{display:flex;gap:2px;background:var(--inp);border-radius:11px;padding:3px;margin-bottom:20px;max-width:520px}.TBN{flex:1;padding:9px;text-align:center;border-radius:9px;border:none;cursor:pointer;font:500 12px var(--f);color:var(--t3);background:transparent;transition:.2s}.TBN.a{background:var(--c);color:var(--t1);box-shadow:0 2px 8px rgba(0,0,0,.3)}.TT{width:100%;border-collapse:collapse;font-size:12px}.TT th{text-align:left;padding:8px;font:600 10px var(--fm);color:var(--t3);text-transform:uppercase;border-bottom:1px solid var(--br)}.TT td{padding:8px;border-bottom:1px solid rgba(38,42,56,.4);color:var(--t2)}.TT tr:hover td{background:rgba(108,99,255,.02)}.TU{color:#22c55e}@keyframes fi{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}.AI{animation:fi .35s ease both}@keyframes gp{0%,100%{box-shadow:0 0 16px rgba(108,99,255,.25)}50%{box-shadow:0 0 32px rgba(108,99,255,.4)}}.GP{animation:gp 2s infinite}@media(max-width:768px){.H h1{font-size:24px}.HS{gap:20px}.RC{grid-template-columns:1fr;gap:10px}.CDI{text-align:left}.FG{grid-template-columns:1fr}.DG{grid-template-columns:1fr 1fr}.CT{padding:16px 12px}.NLB{padding:5px 8px;font-size:11px}}`;

export default function App(){
  const[pg,sP]=useState("home");
  const[paid,sPd]=useState(false);
  const[exp,sE]=useState(null);
  const[tf,sTf]=useState(null);
  const[sb,sSb]=useState("chance");
  const[tq,sTq]=useState("");
  const[tab,sT]=useState(0);
  const[p,spr]=useState({name:"",catPercentile:"",category:"GEN",gender:"Male",tenth:"",twelfth:"",graduation:"",gradStream:"Engineering",workex:"0",piRating:4,gdRating:4,watRating:4});
  const u=(k,v)=>spr(x=>({...x,[k]:v}));
  useEffect(()=>{fetch(`${window.location.hostname==="localhost"?"http://localhost:3001":"https://mba-convert-backend.onrender.com"}/`).catch(()=>{});},[]);
  const go=x=>{sP(x);window.scrollTo({top:0,behavior:"smooth"});};
  const ck=CK[p.category]||"G";

  const res=useMemo(()=>{
    if(!p.catPercentile)return[];
    return C.map(col=>({col,...predict(p,col)})).sort((a,b)=>{
      if(sb==="chance")return b.ch-a.ch;if(sb==="name")return a.col.n.localeCompare(b.col.n);
      if(sb==="tier")return a.col.t-b.col.t;if(sb==="fees")return a.col.f-b.col.f;return b.ch-a.ch;
    });
  },[p,sb]);

  const flt=tf?res.filter(r=>r.col.t===tf):res;
  const elig=res.filter(r=>r.ch>0).length;
  const vis=paid?flt:flt.slice(0,3);

  // ═══ CASHFREE INTEGRATION ═══
  const API_URL = window.location.hostname === "localhost" ? "http://localhost:3001" : "https://mba-convert-backend.onrender.com";

  const handlePay = async () => {
    try {
      // Step 1: Create order on backend
      const res = await fetch(`${API_URL}/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: p.name, email: "student@mbaconvert.in", phone: "9999999999" }),
      });
      const data = await res.json();
      if (!data.success) { alert("Could not create order. Try again."); return; }

      // Step 2: Open Cashfree checkout
      const cashfree = window.Cashfree({ mode: "production" });
      cashfree.checkout({
        paymentSessionId: data.payment_session_id,
        redirectTarget: "_modal",
      }).then(async (result) => {
        if (result.error) { alert("Payment failed. Try again."); return; }
        // Step 3: Verify payment
        const vRes = await fetch(`${API_URL}/verify-payment`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ order_id: data.order_id }),
        });
        const vData = await vRes.json();
        if (vData.success) { sPd(true); sP("results"); }
        else { alert("Payment verification failed. Contact support."); }
      });
    } catch (err) {
      console.error("Payment error:", err);
      alert("Payment failed. Check your connection and try again.");
    }
  };

  const genPDF=useCallback(()=>{
    const el=res.filter(r=>r.ch>0);
    const rows=el.map((r,i)=>`<tr><td>${i+1}</td><td style="font-weight:600">${r.col.n}</td><td>T${r.col.t}</td><td>${r.col.c[ck].toFixed(2)}</td><td style="font-weight:700;color:${r.co}">${r.ch}%</td><td style="color:${r.co}">${r.v}</td><td>${(r.col.f/1e5).toFixed(1)}L</td><td>${(r.col.a/1e5).toFixed(0)}L</td></tr>`).join("");
    const st=el.filter(r=>r.ch>=70).length,md=el.filter(r=>r.ch>=35&&r.ch<70).length,lw=el.filter(r=>r.ch<35).length;
    const dt=new Date().toLocaleDateString("en-IN",{day:"numeric",month:"long",year:"numeric"});
    const h=`<!DOCTYPE html><html><head><meta charset="utf-8"><style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:Segoe UI,Arial,sans-serif;color:#1a1a2e;padding:36px}.hd{text-align:center;margin-bottom:24px;padding-bottom:18px;border-bottom:3px solid #6c63ff}.hd h1{font-size:24px;color:#6c63ff}.hd p{color:#666;font-size:11px;margin-top:4px}.pb{background:#f8f9ff;border:1px solid #e0e0f0;border-radius:8px;padding:16px;margin-bottom:18px;display:flex;flex-wrap:wrap;gap:16px}.pi .pl{font-size:9px;color:#888;text-transform:uppercase}.pi .pv{font-size:13px;font-weight:600;margin-top:1px}.ss{display:flex;gap:10px;margin-bottom:16px;flex-wrap:wrap}.sc{border-radius:8px;padding:10px 12px;text-align:center;flex:1;min-width:80px;border:1px solid #ddd}.sc .sn{font-size:18px;font-weight:700}.sc .sl{font-size:9px;color:#666;margin-top:1px}table{width:100%;border-collapse:collapse;margin-top:8px}th{background:#6c63ff;color:#fff;padding:6px 8px;font-size:9px;text-transform:uppercase;text-align:left}td{padding:5px 8px;font-size:10px;border-bottom:1px solid #e5e7eb}.ft{margin-top:24px;padding-top:12px;border-top:2px solid #eee;text-align:center;color:#999;font-size:9px}</style></head><body><div class="hd"><h1>MBA Convert 2026 - Conversion Report</h1><p>Generated ${dt}</p></div><div class="pb"><div class="pi"><div class="pl">Name</div><div class="pv">${p.name||"N/A"}</div></div><div class="pi"><div class="pl">CAT</div><div class="pv">${p.catPercentile}%ile</div></div><div class="pi"><div class="pl">Cat.</div><div class="pv">${p.category}</div></div><div class="pi"><div class="pl">10th</div><div class="pv">${p.tenth||"-"}%</div></div><div class="pi"><div class="pl">12th</div><div class="pv">${p.twelfth||"-"}%</div></div><div class="pi"><div class="pl">Grad</div><div class="pv">${p.graduation||"-"}%</div></div><div class="pi"><div class="pl">Work-Ex</div><div class="pv">${p.workex}m</div></div><div class="pi"><div class="pl">PI</div><div class="pv">${p.piRating}/7</div></div><div class="pi"><div class="pl">GD</div><div class="pv">${p.gdRating}/7</div></div><div class="pi"><div class="pl">WAT</div><div class="pv">${p.watRating}/7</div></div></div><div class="ss"><div class="sc" style="background:#f0fdf4;border-color:#bbf7d0"><div class="sn" style="color:#22c55e">${st}</div><div class="sl">Strong (70%+)</div></div><div class="sc" style="background:#fffbeb;border-color:#fde68a"><div class="sn" style="color:#f59e0b">${md}</div><div class="sl">Moderate</div></div><div class="sc" style="background:#fef2f2;border-color:#fecaca"><div class="sn" style="color:#ef4444">${lw}</div><div class="sl">Low</div></div><div class="sc"><div class="sn" style="color:#6c63ff">${el.length}</div><div class="sl">Eligible</div></div></div><table><thead><tr><th>#</th><th>College</th><th>Tier</th><th>Cutoff(${p.category})</th><th>Chance</th><th>Verdict</th><th>Fees</th><th>Pkg</th></tr></thead><tbody>${rows}</tbody></table><div class="ft"><strong>MBA Convert 2026</strong><br/>Based on historical data & official weightages. Not affiliated with any IIM.</div></body></html>`;
    const w=window.open("","_blank");if(w){w.document.write(h);w.document.close();setTimeout(()=>w.print(),500);}
  },[res,p,ck]);

  return(<div className="A"><style>{S}</style>
    <nav className="N"><div className="NI">
      <div className="NB" onClick={()=>go("home")}><span>MBA Convert</span><span className="BG">2026</span></div>
      <div className="NL">{[["home","Home"],["form","Predict"],["results","Results"],["trends","Trends"]].map(([k,l])=><button key={k} className={`NLB ${pg===k?"a":""}`} onClick={()=>go(k)}>{l}</button>)}</div>
    </div></nav>
    <div className="CT">

    {pg==="home"&&<div className="AI"><div className="H">
      <div style={{font:"600 12px var(--fm)",color:"var(--ac)",letterSpacing:2,textTransform:"uppercase",marginBottom:18}}>CAT 2025 → IIM 2026-28</div>
      <h1>Know Your <em>Real Chances</em><br/>of Converting That Call</h1>
      <p>Data-driven prediction engine built on 3 years of admission data — analyzing CAT percentile, PI/GD/WAT performance, academics, work experience & category across 60 top MBA colleges.</p>
      <div className="HS"><div><div className="HSN">60</div><div className="HSL">Colleges</div></div><div><div className="HSN">6</div><div className="HSL">Categories</div></div><div><div className="HSN">12+</div><div className="HSL">Parameters</div></div><div><div className="HSN">₹199</div><div className="HSL">Full Report</div></div></div>
      <div style={{marginTop:36,display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}><button className="BP GP" onClick={()=>go("form")}>Start Prediction →</button><button className="BS" onClick={()=>go("trends")}>View Cutoff Trends</button></div>
    </div>
    <div className="G4">{[{i:"📝",t:"Fill Your Profile",d:"CAT score, academics, category, work-ex."},{i:"🎤",t:"Rate PI/GD/WAT",d:"Honest 1-7 self-assessment for each round."},{i:"⚡",t:"Algorithm Scores",d:"Weighted composite using official admission formulas."},{i:"📊",t:"Get Conversion %",d:"College-wise probability + downloadable PDF report."}].map((s,i)=><div key={i} className="CD"><div style={{fontSize:26,marginBottom:10}}>{s.i}</div><div style={{fontWeight:600,fontSize:14,marginBottom:5}}>{s.t}</div><div style={{color:"var(--t2)",fontSize:12,lineHeight:1.5}}>{s.d}</div></div>)}</div>
    </div>}

    {pg==="form"&&<div className="AI">
      <h2 style={{fontSize:22,fontWeight:700,marginBottom:4}}>Your Profile</h2><p style={{color:"var(--t2)",fontSize:13,marginBottom:24}}>Fill accurately for best predictions</p>
      <div style={{marginBottom:24}}><div className="SH"><div className="SI">👤</div><div><div style={{fontWeight:600,fontSize:14}}>Basic Info</div></div></div><div className="FG">
        <div><div className="FL">Name</div><input className="FI" placeholder="Your name" value={p.name} onChange={e=>u("name",e.target.value)}/></div>
        <div><div className="FL">CAT Percentile *</div><input className="FI" type="number" step="0.01" placeholder="e.g. 96.50" value={p.catPercentile} onChange={e=>u("catPercentile",e.target.value)}/></div>
        <div><div className="FL">Category *</div><select className="FS" value={p.category} onChange={e=>u("category",e.target.value)}>{CATS.map(c=><option key={c}>{c}</option>)}</select></div>
        <div><div className="FL">Gender</div><select className="FS" value={p.gender} onChange={e=>u("gender",e.target.value)}><option>Male</option><option>Female</option><option>Other</option></select></div>
      </div></div>
      <div style={{marginBottom:24}}><div className="SH"><div className="SI">🎓</div><div><div style={{fontWeight:600,fontSize:14}}>Academics</div></div></div><div className="FG">
        <div><div className="FL">10th %</div><input className="FI" type="number" step="0.1" placeholder="92" value={p.tenth} onChange={e=>u("tenth",e.target.value)}/></div>
        <div><div className="FL">12th %</div><input className="FI" type="number" step="0.1" placeholder="88" value={p.twelfth} onChange={e=>u("twelfth",e.target.value)}/></div>
        <div><div className="FL">Graduation %</div><input className="FI" type="number" step="0.1" placeholder="78" value={p.graduation} onChange={e=>u("graduation",e.target.value)}/></div>
        <div><div className="FL">Stream</div><select className="FS" value={p.gradStream} onChange={e=>u("gradStream",e.target.value)}><option>Engineering</option><option>Commerce</option><option>Science</option><option>Arts</option><option>CA/CS/CMA</option><option>Other</option></select></div>
      </div></div>
      <div style={{marginBottom:24}}><div className="SH"><div className="SI">💼</div><div><div style={{fontWeight:600,fontSize:14}}>Work Experience</div></div></div><div style={{maxWidth:260}}><div className="FL">Months</div><input className="FI" type="number" min="0" placeholder="24" value={p.workex} onChange={e=>u("workex",e.target.value)}/></div></div>
      <div style={{marginBottom:24}}><div className="SH"><div className="SI">🎯</div><div><div style={{fontWeight:600,fontSize:14}}>PI / GD / WAT Rating</div></div></div>
        <div style={{maxWidth:460}}>{[["piRating","Personal Interview"],["gdRating","Group Discussion"],["watRating","WAT / AWT"]].map(([k,l])=><div key={k} style={{marginBottom:14}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}><span className="FL">{l}</span><span style={{font:"700 12px var(--fm)",color:"var(--ac)"}}>{p[k]}/7</span></div><div className="RT">{[1,2,3,4,5,6,7].map(v=><div key={v} className={`RB ${p[k]===v?"a":""}`} onClick={()=>u(k,v)}>{v}</div>)}</div></div>)}</div>
      </div>
      <div style={{display:"flex",gap:12}}><button className="BP GP" onClick={()=>{if(!p.catPercentile){alert("Enter CAT percentile");return;}go("results");}}>🔮 Predict →</button><button className="BS" onClick={()=>go("home")}>← Back</button></div>
    </div>}

    {pg==="results"&&<div className="AI">{!p.catPercentile?<div style={{textAlign:"center",padding:"60px 0"}}><div style={{fontSize:48,marginBottom:16}}>🎯</div><h2 style={{fontSize:20,fontWeight:700,marginBottom:8}}>Fill your profile first</h2><button className="BP" onClick={()=>go("form")}>Go to Profile →</button></div>:<>
      <div className="CD" style={{display:"flex",flexWrap:"wrap",gap:20,alignItems:"center",marginBottom:18}}>
        <div><div className="DL">Candidate</div><div style={{fontWeight:600}}>{p.name||"—"}</div></div>
        <div><div className="DL">CAT</div><div style={{fontWeight:700,fontFamily:"var(--fm)",color:"var(--ac)"}}>{p.catPercentile}%ile</div></div>
        <div><div className="DL">Category</div><div style={{fontWeight:600}}>{p.category}</div></div>
        <div><div className="DL">Eligible</div><div style={{fontWeight:700,color:"var(--gn)"}}>{elig}/{C.length}</div></div>
        <div style={{marginLeft:"auto"}}><button className="BS" onClick={()=>go("form")}>✏️ Edit</button></div>
      </div>
      <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:10,marginBottom:16,alignItems:"center"}}>
        <span style={{font:"700 11px var(--fm)",color:"var(--t3)"}}>{paid?flt.length+" COLLEGES":`${vis.length} OF ${flt.length}`}</span>
        <div style={{display:"flex",gap:6,alignItems:"center",flexWrap:"wrap"}}>
          {[null,1,2,3].map(t=><button key={String(t)} style={{background:tf===t?"var(--ac)":"var(--inp)",color:tf===t?"#fff":"var(--t2)",border:"1px solid "+(tf===t?"var(--ac)":"var(--br)"),padding:"4px 10px",borderRadius:100,cursor:"pointer",font:"500 11px var(--f)"}} onClick={()=>sTf(t)}>{t===null?"All":"Tier "+t}</button>)}
          <select className="FS" style={{width:"auto",padding:"4px 8px",fontSize:11}} value={sb} onChange={e=>sSb(e.target.value)}><option value="chance">Chance ↓</option><option value="tier">Tier</option><option value="name">Name</option><option value="fees">Fees ↑</option></select>
        </div>
      </div>
      {vis.map((r,i)=><div key={r.col.id} className={`RC ${exp===r.col.id?"x":""}`} onClick={()=>sE(exp===r.col.id?null:r.col.id)}>
        <div className="CM"><div className="CRK">{i+1}</div><div style={{minWidth:0}}><div className="CN">{r.col.n}</div><div className="TG"><span className={`TGI T${r.col.t}`}>Tier {r.col.t}</span><span className="TGI" style={{background:"rgba(108,99,255,.1)",color:"var(--ac)"}}>{r.col.ps}</span>{r.col.a>=2500000&&<span className="TGI" style={{background:"rgba(34,197,94,.1)",color:"var(--gn)"}}>₹{(r.col.a/1e5).toFixed(0)}L</span>}</div></div></div>
        <div className="CDI"><div className="CP" style={{color:r.co}}>{r.ch>0?r.ch+"%":"—"}</div><div className="CV" style={{color:r.co}}>{r.v}</div></div>
        {exp===r.col.id&&<div className="RD">
          <div className="DG">
            <div className="DI"><div className="DL">Cutoff ({p.category})</div><div className="DV">{r.col.c[ck].toFixed(2)}%ile</div></div>
            <div className="DI"><div className="DL">Margin</div><div className="DV" style={{color:parseFloat(p.catPercentile)>=r.col.c[ck]?"var(--gn)":"#ef4444"}}>{(parseFloat(p.catPercentile)-r.col.c[ck]).toFixed(2)}</div></div>
            <div className="DI"><div className="DL">Fees</div><div className="DV">₹{(r.col.f/1e5).toFixed(1)}L</div></div>
            <div className="DI"><div className="DL">Avg Pkg</div><div className="DV">₹{(r.col.a/1e5).toFixed(0)}L</div></div>
            <div className="DI"><div className="DL">Seats</div><div className="DV">{r.col.s}</div></div>
            <div className="DI"><div className="DL">Composite</div><div className="DV" style={{fontFamily:"var(--fm)"}}>{r.comp}/100</div></div>
          </div>
          {r.f.cs!==undefined&&<div style={{marginTop:12}}>
            <div style={{fontSize:10,color:"var(--t3)",marginBottom:6,textTransform:"uppercase",letterSpacing:.5}}>Breakdown</div>
            {[["CAT",r.f.cs,"var(--ac)"],["PI/GD/WAT",r.f.is,"#ff6b9d"],["Academics",r.f.as,"#fbbf24"],["Work-Ex",r.f.ws,"var(--gn)"]].map(([n,s,c])=><div key={n} className="FR"><span className="FN">{n}</span><div className="FBG"><div className="FBF" style={{width:s+"%",background:c}}/></div><span className="FV">{s}</span></div>)}
          </div>}
          <div style={{marginTop:10,display:"flex",gap:5,flexWrap:"wrap"}}>{[["CAT",r.col.w.c],["PI",r.col.w.p],["WAT",r.col.w.wt],["ACAD",r.col.w.ac],["WX",r.col.w.wx]].map(([k,v])=>v>0&&<span key={k} style={{background:"var(--inp)",borderRadius:7,padding:"3px 8px",fontSize:10,fontFamily:"var(--fm)"}}><span style={{color:"var(--t3)"}}>{k}</span> <span style={{color:"var(--ac)",fontWeight:700}}>{v}%</span></span>)}</div>
        </div>}
      </div>)}
      {!paid&&flt.length>3&&<div className="BLO"><div className="BLC">{flt.slice(3,6).map((r,i)=><div key={r.col.id} className="RC" style={{marginBottom:8}}><div className="CM"><div className="CRK">{i+4}</div><div><div className="CN">{r.col.n}</div><div className="TG"><span className={`TGI T${r.col.t}`}>T{r.col.t}</span></div></div></div><div className="CDI"><div className="CP" style={{color:r.co}}>{r.ch}%</div></div></div>)}</div><div className="BLT"><div style={{fontSize:28}}>🔒</div><div style={{fontWeight:700,fontSize:16}}>Unlock All {flt.length} Colleges</div><div style={{color:"var(--t2)",fontSize:13,maxWidth:320,textAlign:"center"}}>Full predictions + factor breakdowns + PDF report</div><button className="BP GP" onClick={handlePay} style={{fontSize:15,padding:"14px 28px"}}>Pay ₹199 — Full Report + PDF</button><div style={{fontSize:10,color:"var(--t3)"}}>Cashfree • UPI / Cards / Wallets</div></div></div>}
      {paid&&res.length>0&&<div className="CD" style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:14,marginTop:14}}><div><div style={{fontWeight:700,fontSize:15}}>Your Full Report is Ready</div><div style={{color:"var(--t2)",fontSize:12,marginTop:3}}>{elig} colleges analyzed • Print or save as PDF</div></div><button className="BP" onClick={genPDF}>📄 Download PDF</button></div>}
    </>}</div>}

    {pg==="trends"&&<div className="AI">
      <h2 style={{fontSize:22,fontWeight:700,marginBottom:4}}>Cutoff Trends & Weightage Analysis</h2>
      <p style={{color:"var(--t2)",fontSize:13,marginBottom:20}}>All 60 colleges • 2-decimal precision • CAT 2023 → 2025</p>
      <div className="TB">{["Cutoffs","Weightage Changes","Key Insights"].map((t,i)=><button key={t} className={`TBN ${tab===i?"a":""}`} onClick={()=>sT(i)}>{t}</button>)}</div>

      {tab===0&&<div><input className="FI" placeholder="Search college..." style={{maxWidth:260,padding:"7px 12px",fontSize:12,marginBottom:12}} value={tq} onChange={e=>sTq(e.target.value)}/>
        <div style={{overflowX:"auto"}}><table className="TT"><thead><tr><th>Institute</th><th>Tier</th><th>GEN'23</th><th>GEN'24</th><th>GEN'25</th><th>OBC'25</th><th>SC'25</th><th>ST'25</th><th>Trend</th></tr></thead>
        <tbody>{TR.filter(r=>r.n.toLowerCase().includes(tq.toLowerCase())).map((r,i)=><tr key={i}><td style={{fontWeight:600,color:"var(--t1)",whiteSpace:"nowrap"}}>{r.n}</td><td><span className={`TGI T${r.t}`} style={{fontSize:9}}>T{r.t}</span></td><td>{r.a}</td><td>{r.b}</td><td style={{fontWeight:600,color:"var(--t1)"}}>{r.c}</td><td>{r.o}</td><td>{r.s}</td><td>{r.st}</td><td className={r.d.includes("↑")?"TU":""}>{r.d}</td></tr>)}</tbody></table></div>
      </div>}

      {tab===1&&<div style={{display:"grid",gap:12}}>{WC.map((s,si)=><div key={si} className="CD"><div style={{fontWeight:700,fontSize:15,marginBottom:10,display:"flex",alignItems:"center",gap:8}}><span style={{color:"var(--ac)"}}>▸</span>{s.col}<span style={{fontSize:9,background:"rgba(255,107,157,.15)",color:"#ff6b9d",padding:"2px 7px",borderRadius:100}}>2026</span></div>
        {s.ch.map((c,ci)=><div key={ci} style={{display:"flex",alignItems:"center",gap:10,padding:"6px 0",borderBottom:ci<s.ch.length-1?"1px solid rgba(38,42,56,.4)":"none",flexWrap:"wrap",fontSize:12}}>
          <span style={{width:28,textAlign:"center",fontFamily:"var(--fm)",fontWeight:700,color:c.d==="↑"?"var(--gn)":c.d==="↓"?"#ef4444":"var(--t3)"}}>{c.d}</span>
          <span style={{width:80,fontWeight:600}}>{c.p}</span>
          <span style={{color:"var(--t3)"}}>{c.o}</span><span style={{color:"var(--t3)"}}>→</span><span style={{fontWeight:600}}>{c.nw}</span>
          <span style={{color:"var(--t2)",marginLeft:6,fontSize:11}}>{c.nt}</span>
        </div>)}</div>)}</div>}

      {tab===2&&<div style={{display:"grid",gap:12}}>{INS.map((x,i)=><div key={i} className="CD"><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}><span style={{fontSize:20}}>{x.i}</span><span style={{fontWeight:700,fontSize:14}}>{x.t}</span></div><p style={{color:"var(--t2)",fontSize:12,lineHeight:1.7}}>{x.b}</p></div>)}</div>}
    </div>}

    {pg==="terms"&&<div className="AI"><h2 style={{fontSize:22,fontWeight:700,marginBottom:4}}>Terms & Conditions</h2><p style={{color:"var(--t2)",fontSize:12,marginBottom:24}}>Last updated: March 2026</p>
      {[["1. Acceptance","By accessing MBA Convert 2026 and making a payment, you agree to these Terms & Conditions. If you do not agree, do not use this service."],
        ["2. Nature of Service","MBA Convert 2026 is a data-driven prediction tool. All conversion percentages, verdicts, and college recommendations are statistical estimates based on historical admission data and publicly available weightage formulas. They are NOT guarantees of admission, shortlisting, or any outcome."],
        ["3. No Affiliation","MBA Convert 2026 is an independent tool. It is not affiliated with, endorsed by, or connected to any IIM, IIT, or any other institution listed on the platform."],
        ["4. Payment","Access to the full report requires a one-time payment of ₹199 (inclusive of all taxes). Payments are processed securely by Cashfree Payments. By paying, you agree to our Refund Policy."],
        ["5. Accuracy Disclaimer","Admission criteria, cutoffs, and weightages change every year. While we strive for accuracy, MBA Convert 2026 does not guarantee that the data reflects the most current admission policies. Always verify with official college websites."],
        ["6. Limitation of Liability","MBA Convert 2026 and its creators shall not be liable for any admission outcome, financial loss, or damage arising from reliance on predictions provided by this tool."],
        ["7. Intellectual Property","All content, data, code, and design on this platform is the intellectual property of MBA Convert 2026. Reproduction, redistribution, or resale of any part of this service is prohibited."],
        ["8. Governing Law","These terms are governed by the laws of India. Any disputes shall be subject to the jurisdiction of courts in India."],
        ["9. Contact","For any queries regarding these terms, email us at support@mbaconvert.in"]
      ].map(([h,b])=><div key={h} className="CD" style={{marginBottom:10}}><div style={{fontWeight:700,fontSize:14,marginBottom:6,color:"var(--t1)"}}>{h}</div><p style={{color:"var(--t2)",fontSize:13,lineHeight:1.7}}>{b}</p></div>)}
    </div>}

    {pg==="refund"&&<div className="AI"><h2 style={{fontSize:22,fontWeight:700,marginBottom:4}}>Refund Policy</h2><p style={{color:"var(--t2)",fontSize:12,marginBottom:24}}>Last updated: March 2026</p>
      {[["No Refund Policy","MBA Convert 2026 offers a digital product — instant access to a full personalized prediction report. Because the report is delivered immediately upon payment and cannot be \"returned\", all sales are final. We do not offer refunds once the report has been accessed."],
        ["Why No Refunds?","The ₹199 payment unlocks access to your complete college-wise prediction report and PDF download. This is a one-time, instantly consumed digital service. Once delivered, the value cannot be reversed."],
        ["Exceptions","If your payment was charged but you did not receive access to the full report due to a technical error on our end, contact us within 48 hours at support@mbaconvert.in with your payment ID. We will resolve it by either restoring access or issuing a full refund — your choice."],
        ["Payment Failures","If your payment failed and money was deducted from your account, it will be automatically refunded to your original payment method within 5–7 business days by Cashfree Payments. If not received, email us with your transaction details."],
        ["Chargebacks","Initiating a chargeback without contacting us first may result in permanent suspension of access. Please reach out to us — we will resolve legitimate issues promptly."],
        ["Contact","Email: support@mbaconvert.in — We respond within 24 hours."]
      ].map(([h,b])=><div key={h} className="CD" style={{marginBottom:10}}><div style={{fontWeight:700,fontSize:14,marginBottom:6,color:"var(--t1)"}}>{h}</div><p style={{color:"var(--t2)",fontSize:13,lineHeight:1.7}}>{b}</p></div>)}
    </div>}

    {pg==="privacy"&&<div className="AI"><h2 style={{fontSize:22,fontWeight:700,marginBottom:4}}>Privacy Policy</h2><p style={{color:"var(--t2)",fontSize:12,marginBottom:24}}>Last updated: March 2026</p>
      {[["Information We Collect","When you use MBA Convert 2026, we collect: (a) Profile data you enter — name, CAT percentile, academic scores, category, work experience, and self-assessed PI/GD/WAT ratings. (b) Payment data — processed entirely by Cashfree Payments. We do not store your card number, UPI ID, or bank details on our servers."],
        ["How We Use Your Data","Your profile data is used solely to generate your prediction report within the current session. We do not store your prediction data on our servers after your session ends. Payment records (order ID, payment status) are retained for transaction verification and support purposes only."],
        ["Third-Party Services","We use Cashfree Payments to process transactions. Cashfree's privacy policy governs the handling of your payment information. We do not share your personal data with any other third party, advertiser, or data broker."],
        ["Cookies","This site does not use tracking cookies or advertising pixels. Basic session functionality may use browser-local storage."],
        ["Data Security","We use HTTPS encryption for all data transmission. Payment processing is handled by PCI-DSS compliant infrastructure via Cashfree."],
        ["Your Rights","You may request deletion of any data associated with your payment (email, name) by contacting support@mbaconvert.in. We will process such requests within 7 business days."],
        ["Children's Privacy","This service is not directed at individuals under 18 years of age."],
        ["Contact","For privacy-related concerns, contact: support@mbaconvert.in"]
      ].map(([h,b])=><div key={h} className="CD" style={{marginBottom:10}}><div style={{fontWeight:700,fontSize:14,marginBottom:6,color:"var(--t1)"}}>{h}</div><p style={{color:"var(--t2)",fontSize:13,lineHeight:1.7}}>{b}</p></div>)}
    </div>}

    <footer style={{textAlign:"center",padding:"40px 0 20px",borderTop:"1px solid var(--br)",marginTop:40,color:"var(--t3)",fontSize:11}}>
      <div style={{fontWeight:600,marginBottom:3}}>MBA Convert 2026</div>
      <div>Based on 3 years of admission data & official weightage formulas. Not affiliated with any IIM.</div>
      <div style={{marginTop:10,display:"flex",justifyContent:"center",gap:16,flexWrap:"wrap"}}>
        <span style={{cursor:"pointer",textDecoration:"underline"}} onClick={()=>go("terms")}>Terms & Conditions</span>
        <span style={{cursor:"pointer",textDecoration:"underline"}} onClick={()=>go("refund")}>Refund Policy</span>
        <span style={{cursor:"pointer",textDecoration:"underline"}} onClick={()=>go("privacy")}>Privacy Policy</span>
      </div>
    </footer>
    </div>
  </div>);
}
