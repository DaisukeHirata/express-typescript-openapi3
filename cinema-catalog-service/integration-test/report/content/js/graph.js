/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
$(document).ready(function() {

    $(".click-title").mouseenter( function(    e){
        e.preventDefault();
        this.style.cursor="pointer";
    });
    $(".click-title").mousedown( function(event){
        event.preventDefault();
    });

    // Ugly code while this script is shared among several pages
    try{
        refreshHitsPerSecond(true);
    } catch(e){}
    try{
        refreshResponseTimeOverTime(true);
    } catch(e){}
    try{
        refreshResponseTimePercentiles();
    } catch(e){}
});


var responseTimePercentilesInfos = {
        data: {"result": {"minY": 135.0, "minX": 0.0, "maxY": 5702.0, "series": [{"data": [[0.0, 135.0], [0.1, 143.0], [0.2, 145.0], [0.3, 146.0], [0.4, 148.0], [0.5, 149.0], [0.6, 150.0], [0.7, 152.0], [0.8, 152.0], [0.9, 153.0], [1.0, 154.0], [1.1, 154.0], [1.2, 155.0], [1.3, 155.0], [1.4, 156.0], [1.5, 156.0], [1.6, 156.0], [1.7, 157.0], [1.8, 157.0], [1.9, 157.0], [2.0, 158.0], [2.1, 158.0], [2.2, 159.0], [2.3, 159.0], [2.4, 159.0], [2.5, 160.0], [2.6, 160.0], [2.7, 161.0], [2.8, 161.0], [2.9, 161.0], [3.0, 162.0], [3.1, 162.0], [3.2, 162.0], [3.3, 163.0], [3.4, 163.0], [3.5, 163.0], [3.6, 163.0], [3.7, 164.0], [3.8, 164.0], [3.9, 164.0], [4.0, 165.0], [4.1, 165.0], [4.2, 165.0], [4.3, 165.0], [4.4, 165.0], [4.5, 166.0], [4.6, 166.0], [4.7, 166.0], [4.8, 166.0], [4.9, 167.0], [5.0, 167.0], [5.1, 167.0], [5.2, 167.0], [5.3, 167.0], [5.4, 168.0], [5.5, 168.0], [5.6, 168.0], [5.7, 168.0], [5.8, 168.0], [5.9, 169.0], [6.0, 169.0], [6.1, 169.0], [6.2, 169.0], [6.3, 169.0], [6.4, 169.0], [6.5, 169.0], [6.6, 170.0], [6.7, 170.0], [6.8, 170.0], [6.9, 170.0], [7.0, 170.0], [7.1, 171.0], [7.2, 171.0], [7.3, 171.0], [7.4, 171.0], [7.5, 171.0], [7.6, 172.0], [7.7, 172.0], [7.8, 172.0], [7.9, 172.0], [8.0, 172.0], [8.1, 172.0], [8.2, 173.0], [8.3, 173.0], [8.4, 173.0], [8.5, 173.0], [8.6, 173.0], [8.7, 173.0], [8.8, 174.0], [8.9, 174.0], [9.0, 174.0], [9.1, 174.0], [9.2, 174.0], [9.3, 174.0], [9.4, 174.0], [9.5, 175.0], [9.6, 175.0], [9.7, 175.0], [9.8, 175.0], [9.9, 175.0], [10.0, 175.0], [10.1, 175.0], [10.2, 176.0], [10.3, 176.0], [10.4, 176.0], [10.5, 176.0], [10.6, 176.0], [10.7, 176.0], [10.8, 177.0], [10.9, 177.0], [11.0, 177.0], [11.1, 177.0], [11.2, 177.0], [11.3, 177.0], [11.4, 177.0], [11.5, 177.0], [11.6, 178.0], [11.7, 178.0], [11.8, 178.0], [11.9, 178.0], [12.0, 178.0], [12.1, 178.0], [12.2, 178.0], [12.3, 178.0], [12.4, 179.0], [12.5, 179.0], [12.6, 179.0], [12.7, 179.0], [12.8, 179.0], [12.9, 179.0], [13.0, 179.0], [13.1, 179.0], [13.2, 179.0], [13.3, 180.0], [13.4, 180.0], [13.5, 180.0], [13.6, 180.0], [13.7, 180.0], [13.8, 180.0], [13.9, 180.0], [14.0, 180.0], [14.1, 181.0], [14.2, 181.0], [14.3, 181.0], [14.4, 181.0], [14.5, 181.0], [14.6, 181.0], [14.7, 181.0], [14.8, 181.0], [14.9, 181.0], [15.0, 181.0], [15.1, 182.0], [15.2, 182.0], [15.3, 182.0], [15.4, 182.0], [15.5, 182.0], [15.6, 182.0], [15.7, 182.0], [15.8, 182.0], [15.9, 183.0], [16.0, 183.0], [16.1, 183.0], [16.2, 183.0], [16.3, 183.0], [16.4, 183.0], [16.5, 183.0], [16.6, 183.0], [16.7, 183.0], [16.8, 183.0], [16.9, 184.0], [17.0, 184.0], [17.1, 184.0], [17.2, 184.0], [17.3, 184.0], [17.4, 184.0], [17.5, 184.0], [17.6, 184.0], [17.7, 184.0], [17.8, 184.0], [17.9, 184.0], [18.0, 184.0], [18.1, 185.0], [18.2, 185.0], [18.3, 185.0], [18.4, 185.0], [18.5, 185.0], [18.6, 185.0], [18.7, 185.0], [18.8, 185.0], [18.9, 186.0], [19.0, 186.0], [19.1, 186.0], [19.2, 186.0], [19.3, 186.0], [19.4, 186.0], [19.5, 186.0], [19.6, 186.0], [19.7, 186.0], [19.8, 186.0], [19.9, 187.0], [20.0, 187.0], [20.1, 187.0], [20.2, 187.0], [20.3, 187.0], [20.4, 187.0], [20.5, 187.0], [20.6, 187.0], [20.7, 187.0], [20.8, 187.0], [20.9, 188.0], [21.0, 188.0], [21.1, 188.0], [21.2, 188.0], [21.3, 188.0], [21.4, 188.0], [21.5, 188.0], [21.6, 188.0], [21.7, 188.0], [21.8, 188.0], [21.9, 188.0], [22.0, 189.0], [22.1, 189.0], [22.2, 189.0], [22.3, 189.0], [22.4, 189.0], [22.5, 189.0], [22.6, 189.0], [22.7, 189.0], [22.8, 189.0], [22.9, 189.0], [23.0, 190.0], [23.1, 190.0], [23.2, 190.0], [23.3, 190.0], [23.4, 190.0], [23.5, 190.0], [23.6, 190.0], [23.7, 190.0], [23.8, 190.0], [23.9, 190.0], [24.0, 191.0], [24.1, 191.0], [24.2, 191.0], [24.3, 191.0], [24.4, 191.0], [24.5, 191.0], [24.6, 191.0], [24.7, 191.0], [24.8, 191.0], [24.9, 191.0], [25.0, 191.0], [25.1, 191.0], [25.2, 192.0], [25.3, 192.0], [25.4, 192.0], [25.5, 192.0], [25.6, 192.0], [25.7, 192.0], [25.8, 192.0], [25.9, 192.0], [26.0, 192.0], [26.1, 192.0], [26.2, 192.0], [26.3, 193.0], [26.4, 193.0], [26.5, 193.0], [26.6, 193.0], [26.7, 193.0], [26.8, 193.0], [26.9, 193.0], [27.0, 193.0], [27.1, 193.0], [27.2, 193.0], [27.3, 193.0], [27.4, 193.0], [27.5, 194.0], [27.6, 194.0], [27.7, 194.0], [27.8, 194.0], [27.9, 194.0], [28.0, 194.0], [28.1, 194.0], [28.2, 194.0], [28.3, 194.0], [28.4, 194.0], [28.5, 194.0], [28.6, 194.0], [28.7, 194.0], [28.8, 195.0], [28.9, 195.0], [29.0, 195.0], [29.1, 195.0], [29.2, 195.0], [29.3, 195.0], [29.4, 195.0], [29.5, 195.0], [29.6, 195.0], [29.7, 195.0], [29.8, 195.0], [29.9, 195.0], [30.0, 196.0], [30.1, 196.0], [30.2, 196.0], [30.3, 196.0], [30.4, 196.0], [30.5, 196.0], [30.6, 196.0], [30.7, 196.0], [30.8, 196.0], [30.9, 196.0], [31.0, 196.0], [31.1, 196.0], [31.2, 196.0], [31.3, 196.0], [31.4, 197.0], [31.5, 197.0], [31.6, 197.0], [31.7, 197.0], [31.8, 197.0], [31.9, 197.0], [32.0, 197.0], [32.1, 197.0], [32.2, 197.0], [32.3, 197.0], [32.4, 197.0], [32.5, 197.0], [32.6, 197.0], [32.7, 197.0], [32.8, 198.0], [32.9, 198.0], [33.0, 198.0], [33.1, 198.0], [33.2, 198.0], [33.3, 198.0], [33.4, 198.0], [33.5, 198.0], [33.6, 198.0], [33.7, 198.0], [33.8, 198.0], [33.9, 198.0], [34.0, 198.0], [34.1, 199.0], [34.2, 199.0], [34.3, 199.0], [34.4, 199.0], [34.5, 199.0], [34.6, 199.0], [34.7, 199.0], [34.8, 199.0], [34.9, 199.0], [35.0, 199.0], [35.1, 199.0], [35.2, 199.0], [35.3, 200.0], [35.4, 200.0], [35.5, 200.0], [35.6, 200.0], [35.7, 200.0], [35.8, 200.0], [35.9, 200.0], [36.0, 200.0], [36.1, 200.0], [36.2, 200.0], [36.3, 200.0], [36.4, 200.0], [36.5, 200.0], [36.6, 201.0], [36.7, 201.0], [36.8, 201.0], [36.9, 201.0], [37.0, 201.0], [37.1, 201.0], [37.2, 201.0], [37.3, 201.0], [37.4, 201.0], [37.5, 201.0], [37.6, 201.0], [37.7, 202.0], [37.8, 202.0], [37.9, 202.0], [38.0, 202.0], [38.1, 202.0], [38.2, 202.0], [38.3, 202.0], [38.4, 202.0], [38.5, 202.0], [38.6, 202.0], [38.7, 202.0], [38.8, 202.0], [38.9, 202.0], [39.0, 203.0], [39.1, 203.0], [39.2, 203.0], [39.3, 203.0], [39.4, 203.0], [39.5, 203.0], [39.6, 203.0], [39.7, 203.0], [39.8, 203.0], [39.9, 203.0], [40.0, 203.0], [40.1, 203.0], [40.2, 204.0], [40.3, 204.0], [40.4, 204.0], [40.5, 204.0], [40.6, 204.0], [40.7, 204.0], [40.8, 204.0], [40.9, 204.0], [41.0, 204.0], [41.1, 204.0], [41.2, 205.0], [41.3, 205.0], [41.4, 205.0], [41.5, 205.0], [41.6, 205.0], [41.7, 205.0], [41.8, 205.0], [41.9, 205.0], [42.0, 205.0], [42.1, 205.0], [42.2, 205.0], [42.3, 205.0], [42.4, 205.0], [42.5, 205.0], [42.6, 205.0], [42.7, 206.0], [42.8, 206.0], [42.9, 206.0], [43.0, 206.0], [43.1, 206.0], [43.2, 206.0], [43.3, 206.0], [43.4, 206.0], [43.5, 206.0], [43.6, 206.0], [43.7, 206.0], [43.8, 206.0], [43.9, 207.0], [44.0, 207.0], [44.1, 207.0], [44.2, 207.0], [44.3, 207.0], [44.4, 207.0], [44.5, 207.0], [44.6, 207.0], [44.7, 207.0], [44.8, 207.0], [44.9, 207.0], [45.0, 207.0], [45.1, 208.0], [45.2, 208.0], [45.3, 208.0], [45.4, 208.0], [45.5, 208.0], [45.6, 208.0], [45.7, 208.0], [45.8, 208.0], [45.9, 208.0], [46.0, 208.0], [46.1, 208.0], [46.2, 208.0], [46.3, 208.0], [46.4, 208.0], [46.5, 209.0], [46.6, 209.0], [46.7, 209.0], [46.8, 209.0], [46.9, 209.0], [47.0, 209.0], [47.1, 209.0], [47.2, 209.0], [47.3, 209.0], [47.4, 209.0], [47.5, 209.0], [47.6, 209.0], [47.7, 209.0], [47.8, 210.0], [47.9, 210.0], [48.0, 210.0], [48.1, 210.0], [48.2, 210.0], [48.3, 210.0], [48.4, 210.0], [48.5, 210.0], [48.6, 210.0], [48.7, 210.0], [48.8, 210.0], [48.9, 211.0], [49.0, 211.0], [49.1, 211.0], [49.2, 211.0], [49.3, 211.0], [49.4, 211.0], [49.5, 211.0], [49.6, 211.0], [49.7, 211.0], [49.8, 211.0], [49.9, 211.0], [50.0, 212.0], [50.1, 212.0], [50.2, 212.0], [50.3, 212.0], [50.4, 212.0], [50.5, 212.0], [50.6, 212.0], [50.7, 212.0], [50.8, 212.0], [50.9, 212.0], [51.0, 213.0], [51.1, 213.0], [51.2, 213.0], [51.3, 213.0], [51.4, 213.0], [51.5, 213.0], [51.6, 213.0], [51.7, 213.0], [51.8, 213.0], [51.9, 213.0], [52.0, 213.0], [52.1, 213.0], [52.2, 213.0], [52.3, 214.0], [52.4, 214.0], [52.5, 214.0], [52.6, 214.0], [52.7, 214.0], [52.8, 214.0], [52.9, 214.0], [53.0, 214.0], [53.1, 214.0], [53.2, 214.0], [53.3, 214.0], [53.4, 214.0], [53.5, 214.0], [53.6, 215.0], [53.7, 215.0], [53.8, 215.0], [53.9, 215.0], [54.0, 215.0], [54.1, 215.0], [54.2, 215.0], [54.3, 215.0], [54.4, 215.0], [54.5, 215.0], [54.6, 215.0], [54.7, 216.0], [54.8, 216.0], [54.9, 216.0], [55.0, 216.0], [55.1, 216.0], [55.2, 216.0], [55.3, 216.0], [55.4, 216.0], [55.5, 216.0], [55.6, 216.0], [55.7, 216.0], [55.8, 217.0], [55.9, 217.0], [56.0, 217.0], [56.1, 217.0], [56.2, 217.0], [56.3, 217.0], [56.4, 217.0], [56.5, 217.0], [56.6, 218.0], [56.7, 218.0], [56.8, 218.0], [56.9, 218.0], [57.0, 218.0], [57.1, 218.0], [57.2, 218.0], [57.3, 218.0], [57.4, 218.0], [57.5, 218.0], [57.6, 219.0], [57.7, 219.0], [57.8, 219.0], [57.9, 219.0], [58.0, 219.0], [58.1, 219.0], [58.2, 219.0], [58.3, 219.0], [58.4, 219.0], [58.5, 220.0], [58.6, 220.0], [58.7, 220.0], [58.8, 220.0], [58.9, 220.0], [59.0, 220.0], [59.1, 220.0], [59.2, 220.0], [59.3, 220.0], [59.4, 221.0], [59.5, 221.0], [59.6, 221.0], [59.7, 221.0], [59.8, 221.0], [59.9, 221.0], [60.0, 221.0], [60.1, 221.0], [60.2, 221.0], [60.3, 221.0], [60.4, 221.0], [60.5, 222.0], [60.6, 222.0], [60.7, 222.0], [60.8, 222.0], [60.9, 222.0], [61.0, 222.0], [61.1, 222.0], [61.2, 222.0], [61.3, 222.0], [61.4, 222.0], [61.5, 222.0], [61.6, 223.0], [61.7, 223.0], [61.8, 223.0], [61.9, 223.0], [62.0, 223.0], [62.1, 223.0], [62.2, 223.0], [62.3, 223.0], [62.4, 223.0], [62.5, 224.0], [62.6, 224.0], [62.7, 224.0], [62.8, 224.0], [62.9, 224.0], [63.0, 224.0], [63.1, 224.0], [63.2, 224.0], [63.3, 225.0], [63.4, 225.0], [63.5, 225.0], [63.6, 225.0], [63.7, 225.0], [63.8, 225.0], [63.9, 225.0], [64.0, 225.0], [64.1, 225.0], [64.2, 226.0], [64.3, 226.0], [64.4, 226.0], [64.5, 226.0], [64.6, 226.0], [64.7, 226.0], [64.8, 227.0], [64.9, 227.0], [65.0, 227.0], [65.1, 227.0], [65.2, 227.0], [65.3, 227.0], [65.4, 227.0], [65.5, 227.0], [65.6, 227.0], [65.7, 228.0], [65.8, 228.0], [65.9, 228.0], [66.0, 228.0], [66.1, 228.0], [66.2, 228.0], [66.3, 228.0], [66.4, 228.0], [66.5, 229.0], [66.6, 229.0], [66.7, 229.0], [66.8, 229.0], [66.9, 229.0], [67.0, 229.0], [67.1, 229.0], [67.2, 229.0], [67.3, 230.0], [67.4, 230.0], [67.5, 230.0], [67.6, 230.0], [67.7, 230.0], [67.8, 230.0], [67.9, 230.0], [68.0, 231.0], [68.1, 231.0], [68.2, 231.0], [68.3, 231.0], [68.4, 231.0], [68.5, 231.0], [68.6, 231.0], [68.7, 232.0], [68.8, 232.0], [68.9, 232.0], [69.0, 232.0], [69.1, 232.0], [69.2, 232.0], [69.3, 232.0], [69.4, 233.0], [69.5, 233.0], [69.6, 233.0], [69.7, 233.0], [69.8, 233.0], [69.9, 233.0], [70.0, 233.0], [70.1, 233.0], [70.2, 234.0], [70.3, 234.0], [70.4, 234.0], [70.5, 234.0], [70.6, 234.0], [70.7, 234.0], [70.8, 235.0], [70.9, 235.0], [71.0, 235.0], [71.1, 235.0], [71.2, 235.0], [71.3, 235.0], [71.4, 235.0], [71.5, 236.0], [71.6, 236.0], [71.7, 236.0], [71.8, 236.0], [71.9, 236.0], [72.0, 237.0], [72.1, 237.0], [72.2, 237.0], [72.3, 237.0], [72.4, 237.0], [72.5, 238.0], [72.6, 238.0], [72.7, 238.0], [72.8, 238.0], [72.9, 238.0], [73.0, 238.0], [73.1, 238.0], [73.2, 239.0], [73.3, 239.0], [73.4, 239.0], [73.5, 239.0], [73.6, 239.0], [73.7, 239.0], [73.8, 240.0], [73.9, 240.0], [74.0, 240.0], [74.1, 240.0], [74.2, 240.0], [74.3, 240.0], [74.4, 240.0], [74.5, 241.0], [74.6, 241.0], [74.7, 241.0], [74.8, 241.0], [74.9, 241.0], [75.0, 241.0], [75.1, 242.0], [75.2, 242.0], [75.3, 242.0], [75.4, 242.0], [75.5, 242.0], [75.6, 242.0], [75.7, 243.0], [75.8, 243.0], [75.9, 243.0], [76.0, 243.0], [76.1, 243.0], [76.2, 243.0], [76.3, 244.0], [76.4, 244.0], [76.5, 244.0], [76.6, 244.0], [76.7, 244.0], [76.8, 245.0], [76.9, 245.0], [77.0, 245.0], [77.1, 245.0], [77.2, 245.0], [77.3, 245.0], [77.4, 246.0], [77.5, 246.0], [77.6, 246.0], [77.7, 246.0], [77.8, 246.0], [77.9, 246.0], [78.0, 247.0], [78.1, 247.0], [78.2, 247.0], [78.3, 247.0], [78.4, 247.0], [78.5, 248.0], [78.6, 248.0], [78.7, 248.0], [78.8, 248.0], [78.9, 249.0], [79.0, 249.0], [79.1, 249.0], [79.2, 250.0], [79.3, 250.0], [79.4, 250.0], [79.5, 250.0], [79.6, 250.0], [79.7, 251.0], [79.8, 251.0], [79.9, 251.0], [80.0, 251.0], [80.1, 252.0], [80.2, 252.0], [80.3, 252.0], [80.4, 252.0], [80.5, 252.0], [80.6, 253.0], [80.7, 253.0], [80.8, 253.0], [80.9, 253.0], [81.0, 254.0], [81.1, 254.0], [81.2, 254.0], [81.3, 255.0], [81.4, 255.0], [81.5, 255.0], [81.6, 256.0], [81.7, 256.0], [81.8, 256.0], [81.9, 256.0], [82.0, 257.0], [82.1, 257.0], [82.2, 257.0], [82.3, 257.0], [82.4, 258.0], [82.5, 258.0], [82.6, 258.0], [82.7, 259.0], [82.8, 259.0], [82.9, 259.0], [83.0, 259.0], [83.1, 260.0], [83.2, 260.0], [83.3, 260.0], [83.4, 261.0], [83.5, 261.0], [83.6, 261.0], [83.7, 261.0], [83.8, 262.0], [83.9, 262.0], [84.0, 263.0], [84.1, 263.0], [84.2, 263.0], [84.3, 264.0], [84.4, 264.0], [84.5, 264.0], [84.6, 265.0], [84.7, 265.0], [84.8, 265.0], [84.9, 266.0], [85.0, 266.0], [85.1, 266.0], [85.2, 267.0], [85.3, 267.0], [85.4, 267.0], [85.5, 268.0], [85.6, 268.0], [85.7, 268.0], [85.8, 269.0], [85.9, 269.0], [86.0, 269.0], [86.1, 269.0], [86.2, 270.0], [86.3, 270.0], [86.4, 270.0], [86.5, 271.0], [86.6, 271.0], [86.7, 272.0], [86.8, 272.0], [86.9, 272.0], [87.0, 272.0], [87.1, 273.0], [87.2, 273.0], [87.3, 274.0], [87.4, 274.0], [87.5, 274.0], [87.6, 275.0], [87.7, 276.0], [87.8, 276.0], [87.9, 276.0], [88.0, 277.0], [88.1, 277.0], [88.2, 277.0], [88.3, 278.0], [88.4, 278.0], [88.5, 279.0], [88.6, 280.0], [88.7, 280.0], [88.8, 281.0], [88.9, 281.0], [89.0, 282.0], [89.1, 282.0], [89.2, 283.0], [89.3, 283.0], [89.4, 284.0], [89.5, 284.0], [89.6, 284.0], [89.7, 285.0], [89.8, 286.0], [89.9, 286.0], [90.0, 287.0], [90.1, 287.0], [90.2, 288.0], [90.3, 289.0], [90.4, 289.0], [90.5, 289.0], [90.6, 290.0], [90.7, 291.0], [90.8, 292.0], [90.9, 292.0], [91.0, 293.0], [91.1, 293.0], [91.2, 294.0], [91.3, 295.0], [91.4, 295.0], [91.5, 296.0], [91.6, 296.0], [91.7, 297.0], [91.8, 298.0], [91.9, 299.0], [92.0, 299.0], [92.1, 299.0], [92.2, 301.0], [92.3, 301.0], [92.4, 302.0], [92.5, 303.0], [92.6, 303.0], [92.7, 304.0], [92.8, 305.0], [92.9, 305.0], [93.0, 306.0], [93.1, 306.0], [93.2, 307.0], [93.3, 308.0], [93.4, 309.0], [93.5, 310.0], [93.6, 311.0], [93.7, 312.0], [93.8, 313.0], [93.9, 315.0], [94.0, 316.0], [94.1, 317.0], [94.2, 319.0], [94.3, 320.0], [94.4, 322.0], [94.5, 323.0], [94.6, 324.0], [94.7, 327.0], [94.8, 329.0], [94.9, 330.0], [95.0, 332.0], [95.1, 333.0], [95.2, 334.0], [95.3, 336.0], [95.4, 337.0], [95.5, 342.0], [95.6, 345.0], [95.7, 347.0], [95.8, 350.0], [95.9, 352.0], [96.0, 356.0], [96.1, 359.0], [96.2, 366.0], [96.3, 370.0], [96.4, 374.0], [96.5, 379.0], [96.6, 384.0], [96.7, 393.0], [96.8, 399.0], [96.9, 406.0], [97.0, 415.0], [97.1, 424.0], [97.2, 433.0], [97.3, 444.0], [97.4, 461.0], [97.5, 491.0], [97.6, 501.0], [97.7, 531.0], [97.8, 589.0], [97.9, 658.0], [98.0, 770.0], [98.1, 1086.0], [98.2, 1265.0], [98.3, 1333.0], [98.4, 1382.0], [98.5, 1404.0], [98.6, 1424.0], [98.7, 1461.0], [98.8, 1775.0], [98.9, 2955.0], [99.0, 3136.0], [99.1, 3555.0], [99.2, 5185.0], [99.3, 5201.0], [99.4, 5216.0], [99.5, 5226.0], [99.6, 5238.0], [99.7, 5247.0], [99.8, 5282.0], [99.9, 5334.0], [100.0, 5702.0]], "isOverall": false, "label": "Fetch cinemas cinema_id movie_id", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 100.0, "title": "Response Time Percentiles"}},
        getOptions: function() {
            return {
                series: {
                    points: { show: false }
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentiles'
                },
                xaxis: {
                    tickDecimals: 1,
                    axisLabel: "Percentiles",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Percentile value in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : %x.2 percentile was %y ms"
                },
                selection: { mode: "xy" },
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentiles"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesPercentiles"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesPercentiles"), dataset, prepareOverviewOptions(options));
        }
};

/**
 * @param elementId Id of element where we display message
 */
function setEmptyGraph(elementId) {
    $(function() {
        $(elementId).text("No graph series with filter="+seriesFilter);
    });
}

// Response times percentiles
function refreshResponseTimePercentiles() {
    var infos = responseTimePercentilesInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimePercentiles");
        return;
    }
    if (isGraph($("#flotResponseTimesPercentiles"))){
        infos.createGraph();
    } else {
        var choiceContainer = $("#choicesResponseTimePercentiles");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesPercentiles", "#overviewResponseTimesPercentiles");
        $('#bodyResponseTimePercentiles .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimeDistributionInfos = {
        data: {"result": {"minY": 1.0, "minX": 100.0, "maxY": 5685.0, "series": [{"data": [[600.0, 14.0], [700.0, 6.0], [800.0, 3.0], [900.0, 5.0], [1000.0, 1.0], [1100.0, 4.0], [1200.0, 8.0], [1300.0, 26.0], [1400.0, 26.0], [1500.0, 4.0], [100.0, 3526.0], [1600.0, 1.0], [1700.0, 1.0], [2100.0, 2.0], [2200.0, 1.0], [2300.0, 1.0], [2400.0, 1.0], [2800.0, 2.0], [2900.0, 3.0], [3000.0, 4.0], [3100.0, 10.0], [200.0, 5685.0], [3300.0, 1.0], [3200.0, 3.0], [3400.0, 1.0], [3500.0, 1.0], [4400.0, 2.0], [300.0, 469.0], [4700.0, 2.0], [5100.0, 14.0], [5200.0, 55.0], [5300.0, 11.0], [5400.0, 4.0], [5600.0, 1.0], [5700.0, 1.0], [400.0, 78.0], [500.0, 23.0]], "isOverall": false, "label": "Fetch cinemas cinema_id movie_id", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 5700.0, "title": "Response Time Distribution"}},
        getOptions: function() {
            var granularity = this.data.result.granularity;
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    barWidth: this.data.result.granularity
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " responses for " + label + " were between " + xval + " and " + (xval + granularity) + " ms";
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimeDistribution"), prepareData(data.result.series, $("#choicesResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshResponseTimeDistribution() {
    var infos = responseTimeDistributionInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeDistribution");
        return;
    }
    if (isGraph($("#flotResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var syntheticResponseTimeDistributionInfos = {
        data: {"result": {"minY": 11.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 9758.0, "series": [{"data": [[0.0, 9758.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 116.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [[2.0, 115.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [[3.0, 11.0]], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 3.0, "title": "Synthetic Response Times Distribution"}},
        getOptions: function() {
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendSyntheticResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times ranges",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                    tickLength:0,
                    min:-0.5,
                    max:3.5
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    align: "center",
                    barWidth: 0.25,
                    fill:.75
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " " + label;
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            options.xaxis.ticks = data.result.ticks;
            $.plot($("#flotSyntheticResponseTimeDistribution"), prepareData(data.result.series, $("#choicesSyntheticResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshSyntheticResponseTimeDistribution() {
    var infos = syntheticResponseTimeDistributionInfos;
    prepareSeries(infos.data, true);
    if (isGraph($("#flotSyntheticResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerSyntheticResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var activeThreadsOverTimeInfos = {
        data: {"result": {"minY": 12.692998204667868, "minX": 1.56264834E12, "maxY": 31.677013422818803, "series": [{"data": [[1.56264834E12, 12.692998204667868], [1.56264846E12, 22.27332759115701], [1.5626484E12, 31.677013422818803]], "isOverall": false, "label": "Item API Perf Test", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.56264846E12, "title": "Active Threads Over Time"}},
        getOptions: function() {
            return {
                series: {
                    stack: true,
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 6,
                    show: true,
                    container: '#legendActiveThreadsOverTime'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                selection: {
                    mode: 'xy'
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : At %x there were %y active threads"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesActiveThreadsOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotActiveThreadsOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewActiveThreadsOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Active Threads Over Time
function refreshActiveThreadsOverTime(fixTimestamps) {
    var infos = activeThreadsOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 32400000);
    }
    if(isGraph($("#flotActiveThreadsOverTime"))) {
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesActiveThreadsOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotActiveThreadsOverTime", "#overviewActiveThreadsOverTime");
        $('#footerActiveThreadsOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var timeVsThreadsInfos = {
        data: {"result": {"minY": 210.54716981132088, "minX": 1.0, "maxY": 817.3333333333333, "series": [{"data": [[2.0, 817.3333333333333], [32.0, 356.54676258992794], [33.0, 298.8524980174468], [34.0, 323.6806108897749], [35.0, 313.87321428571505], [3.0, 299.1666666666667], [4.0, 259.07692307692304], [5.0, 301.5], [6.0, 257.2435897435897], [7.0, 248.76470588235293], [8.0, 265.89090909090913], [9.0, 277.27551020408157], [10.0, 217.16000000000003], [11.0, 219.3191489361702], [12.0, 215.993288590604], [13.0, 233.02439024390245], [14.0, 211.3027522935779], [15.0, 210.54716981132088], [1.0, 294.83333333333337], [16.0, 224.84324324324322], [17.0, 278.94339622641513], [18.0, 214.73831775700936], [19.0, 323.9032258064514], [20.0, 250.10958904109597], [21.0, 249.5917431192657], [22.0, 317.07207207207216], [23.0, 249.89912280701748], [24.0, 221.58188153310113], [25.0, 240.75315568022427], [26.0, 258.533582089552], [27.0, 295.23453608247405], [28.0, 414.49696969696964], [29.0, 237.99999999999997], [30.0, 323.0191740412981], [31.0, 250.49584026622287]], "isOverall": false, "label": "Fetch cinemas cinema_id movie_id", "isController": false}, {"data": [[27.344300000000025, 283.77800000000116]], "isOverall": false, "label": "Fetch cinemas cinema_id movie_id-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 35.0, "title": "Time VS Threads"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: { noColumns: 2,show: true, container: '#legendTimeVsThreads' },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s: At %x.2 active threads, Average response time was %y.2 ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesTimeVsThreads"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotTimesVsThreads"), dataset, options);
            // setup overview
            $.plot($("#overviewTimesVsThreads"), dataset, prepareOverviewOptions(options));
        }
};

// Time vs threads
function refreshTimeVsThreads(){
    var infos = timeVsThreadsInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTimeVsThreads");
        return;
    }
    if(isGraph($("#flotTimesVsThreads"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTimeVsThreads");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTimesVsThreads", "#overviewTimesVsThreads");
        $('#footerTimeVsThreads .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var bytesThroughputOverTimeInfos = {
        data : {"result": {"minY": 12448.95, "minX": 1.56264834E12, "maxY": 425140.3, "series": [{"data": [[1.56264834E12, 39530.55], [1.56264846E12, 248441.58333333334], [1.5626484E12, 425140.3]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.56264834E12, 12448.95], [1.56264846E12, 77845.05], [1.5626484E12, 133206.0]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.56264846E12, "title": "Bytes Throughput Over Time"}},
        getOptions : function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity) ,
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Bytes / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendBytesThroughputOverTime'
                },
                selection: {
                    mode: "xy"
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y"
                }
            };
        },
        createGraph : function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesBytesThroughputOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotBytesThroughputOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewBytesThroughputOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Bytes throughput Over Time
function refreshBytesThroughputOverTime(fixTimestamps) {
    var infos = bytesThroughputOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 32400000);
    }
    if(isGraph($("#flotBytesThroughputOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesBytesThroughputOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotBytesThroughputOverTime", "#overviewBytesThroughputOverTime");
        $('#footerBytesThroughputOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimesOverTimeInfos = {
        data: {"result": {"minY": 232.0772322710308, "minX": 1.56264834E12, "maxY": 315.1666107382548, "series": [{"data": [[1.56264834E12, 271.2064631956913], [1.56264846E12, 232.0772322710308], [1.5626484E12, 315.1666107382548]], "isOverall": false, "label": "Fetch cinemas cinema_id movie_id", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.56264846E12, "title": "Response Time Over Time"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average response time was %y ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Times Over Time
function refreshResponseTimeOverTime(fixTimestamps) {
    var infos = responseTimesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 32400000);
    }
    if(isGraph($("#flotResponseTimesOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesOverTime", "#overviewResponseTimesOverTime");
        $('#footerResponseTimesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var latenciesOverTimeInfos = {
        data: {"result": {"minY": 232.07263853000288, "minX": 1.56264834E12, "maxY": 315.1585570469792, "series": [{"data": [[1.56264834E12, 271.1777378815079], [1.56264846E12, 232.07263853000288], [1.5626484E12, 315.1585570469792]], "isOverall": false, "label": "Fetch cinemas cinema_id movie_id", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.56264846E12, "title": "Latencies Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response latencies in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendLatenciesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average latency was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesLatenciesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotLatenciesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewLatenciesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Latencies Over Time
function refreshLatenciesOverTime(fixTimestamps) {
    var infos = latenciesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyLatenciesOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 32400000);
    }
    if(isGraph($("#flotLatenciesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesLatenciesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotLatenciesOverTime", "#overviewLatenciesOverTime");
        $('#footerLatenciesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var connectTimeOverTimeInfos = {
        data: {"result": {"minY": 37.486535008976595, "minX": 1.56264834E12, "maxY": 123.52751677852345, "series": [{"data": [[1.56264834E12, 37.486535008976595], [1.56264846E12, 51.32960091874809], [1.5626484E12, 123.52751677852345]], "isOverall": false, "label": "Fetch cinemas cinema_id movie_id", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.56264846E12, "title": "Connect Time Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getConnectTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average Connect Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendConnectTimeOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average connect time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesConnectTimeOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotConnectTimeOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewConnectTimeOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Connect Time Over Time
function refreshConnectTimeOverTime(fixTimestamps) {
    var infos = connectTimeOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyConnectTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 32400000);
    }
    if(isGraph($("#flotConnectTimeOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesConnectTimeOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotConnectTimeOverTime", "#overviewConnectTimeOverTime");
        $('#footerConnectTimeOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var responseTimePercentilesOverTimeInfos = {
        data: {"result": {"minY": 135.0, "minX": 1.56264834E12, "maxY": 5702.0, "series": [{"data": [[1.56264834E12, 2915.0], [1.56264846E12, 5319.0], [1.5626484E12, 5702.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.56264834E12, 135.0], [1.56264846E12, 135.0], [1.5626484E12, 135.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.56264834E12, 301.8], [1.56264846E12, 286.0], [1.5626484E12, 292.0]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.56264834E12, 634.3200000000002], [1.56264846E12, 2965.400000000038], [1.5626484E12, 5209.0]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.56264834E12, 368.9999999999999], [1.56264846E12, 330.0], [1.5626484E12, 348.0]], "isOverall": false, "label": "95th percentile", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.56264846E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Response Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentilesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Response time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentilesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimePercentilesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimePercentilesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Time Percentiles Over Time
function refreshResponseTimePercentilesOverTime(fixTimestamps) {
    var infos = responseTimePercentilesOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 32400000);
    }
    if(isGraph($("#flotResponseTimePercentilesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimePercentilesOverTime", "#overviewResponseTimePercentilesOverTime");
        $('#footerResponseTimePercentilesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var responseTimeVsRequestInfos = {
    data: {"result": {"minY": 189.0, "minX": 1000.0, "maxY": 3166.0, "series": [{"data": [[5000.0, 219.5], [3000.0, 219.0], [6000.0, 189.0], [7000.0, 244.0], [1000.0, 211.0], [2000.0, 212.0], [4000.0, 215.5]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[1000.0, 3166.0], [2000.0, 3116.5]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1, "maxX": 7000.0, "title": "Response Time Vs Request"}},
    getOptions: function() {
        return {
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Response Time in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: {
                noColumns: 2,
                show: true,
                container: '#legendResponseTimeVsRequest'
            },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median response time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesResponseTimeVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotResponseTimeVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewResponseTimeVsRequest"), dataset, prepareOverviewOptions(options));

    }
};

// Response Time vs Request
function refreshResponseTimeVsRequest() {
    var infos = responseTimeVsRequestInfos;
    prepareSeries(infos.data);
    if (isGraph($("#flotResponseTimeVsRequest"))){
        infos.create();
    }else{
        var choiceContainer = $("#choicesResponseTimeVsRequest");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimeVsRequest", "#overviewResponseTimeVsRequest");
        $('#footerResponseRimeVsRequest .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var latenciesVsRequestInfos = {
    data: {"result": {"minY": 189.0, "minX": 1000.0, "maxY": 3166.0, "series": [{"data": [[5000.0, 219.5], [3000.0, 219.0], [6000.0, 189.0], [7000.0, 244.0], [1000.0, 211.0], [2000.0, 212.0], [4000.0, 215.5]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[1000.0, 3166.0], [2000.0, 3116.0]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1, "maxX": 7000.0, "title": "Latencies Vs Request"}},
    getOptions: function() {
        return{
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Latency in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: { noColumns: 2,show: true, container: '#legendLatencyVsRequest' },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median Latency time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesLatencyVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotLatenciesVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewLatenciesVsRequest"), dataset, prepareOverviewOptions(options));
    }
};

// Latencies vs Request
function refreshLatenciesVsRequest() {
        var infos = latenciesVsRequestInfos;
        prepareSeries(infos.data);
        if(isGraph($("#flotLatenciesVsRequest"))){
            infos.createGraph();
        }else{
            var choiceContainer = $("#choicesLatencyVsRequest");
            createLegend(choiceContainer, infos);
            infos.createGraph();
            setGraphZoomable("#flotLatenciesVsRequest", "#overviewLatenciesVsRequest");
            $('#footerLatenciesVsRequest .legendColorBox > div').each(function(i){
                $(this).clone().prependTo(choiceContainer.find("li").eq(i));
            });
        }
};

var hitsPerSecondInfos = {
        data: {"result": {"minY": 9.6, "minX": 1.56264834E12, "maxY": 99.51666666666667, "series": [{"data": [[1.56264834E12, 9.6], [1.56264846E12, 57.55], [1.5626484E12, 99.51666666666667]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.56264846E12, "title": "Hits Per Second"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of hits / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendHitsPerSecond"
                },
                selection: {
                    mode : 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y.2 hits/sec"
                }
            };
        },
        createGraph: function createGraph() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesHitsPerSecond"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotHitsPerSecond"), dataset, options);
            // setup overview
            $.plot($("#overviewHitsPerSecond"), dataset, prepareOverviewOptions(options));
        }
};

// Hits per second
function refreshHitsPerSecond(fixTimestamps) {
    var infos = hitsPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 32400000);
    }
    if (isGraph($("#flotHitsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesHitsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotHitsPerSecond", "#overviewHitsPerSecond");
        $('#footerHitsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var codesPerSecondInfos = {
        data: {"result": {"minY": 0.03333333333333333, "minX": 1.56264834E12, "maxY": 99.28333333333333, "series": [{"data": [[1.56264834E12, 9.183333333333334], [1.56264846E12, 58.016666666666666], [1.5626484E12, 99.28333333333333]], "isOverall": false, "label": "200", "isController": false}, {"data": [[1.56264834E12, 0.1], [1.56264846E12, 0.03333333333333333], [1.5626484E12, 0.05]], "isOverall": false, "label": "408", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.56264846E12, "title": "Codes Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendCodesPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "Number of Response Codes %s at %x was %y.2 responses / sec"
                }
            };
        },
    createGraph: function() {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesCodesPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotCodesPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewCodesPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Codes per second
function refreshCodesPerSecond(fixTimestamps) {
    var infos = codesPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 32400000);
    }
    if(isGraph($("#flotCodesPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesCodesPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotCodesPerSecond", "#overviewCodesPerSecond");
        $('#footerCodesPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var transactionsPerSecondInfos = {
        data: {"result": {"minY": 0.03333333333333333, "minX": 1.56264834E12, "maxY": 99.28333333333333, "series": [{"data": [[1.56264834E12, 9.183333333333334], [1.56264846E12, 58.016666666666666], [1.5626484E12, 99.28333333333333]], "isOverall": false, "label": "Fetch cinemas cinema_id movie_id-success", "isController": false}, {"data": [[1.56264834E12, 0.1], [1.56264846E12, 0.03333333333333333], [1.5626484E12, 0.05]], "isOverall": false, "label": "Fetch cinemas cinema_id movie_id-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.56264846E12, "title": "Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTransactionsPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                }
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTransactionsPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTransactionsPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewTransactionsPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Transactions per second
function refreshTransactionsPerSecond(fixTimestamps) {
    var infos = transactionsPerSecondInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTransactionsPerSecond");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 32400000);
    }
    if(isGraph($("#flotTransactionsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTransactionsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTransactionsPerSecond", "#overviewTransactionsPerSecond");
        $('#footerTransactionsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var totalTPSInfos = {
        data: {"result": {"minY": 0.03333333333333333, "minX": 1.56264834E12, "maxY": 99.28333333333333, "series": [{"data": [[1.56264834E12, 9.183333333333334], [1.56264846E12, 58.016666666666666], [1.5626484E12, 99.28333333333333]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [[1.56264834E12, 0.1], [1.56264846E12, 0.03333333333333333], [1.5626484E12, 0.05]], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.56264846E12, "title": "Total Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTotalTPS"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                },
                colors: ["#9ACD32", "#FF6347"]
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTotalTPS"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTotalTPS"), dataset, options);
        // setup overview
        $.plot($("#overviewTotalTPS"), dataset, prepareOverviewOptions(options));
    }
};

// Total Transactions per second
function refreshTotalTPS(fixTimestamps) {
    var infos = totalTPSInfos;
    // We want to ignore seriesFilter
    prepareSeries(infos.data, false, true);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 32400000);
    }
    if(isGraph($("#flotTotalTPS"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTotalTPS");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTotalTPS", "#overviewTotalTPS");
        $('#footerTotalTPS .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

// Collapse the graph matching the specified DOM element depending the collapsed
// status
function collapse(elem, collapsed){
    if(collapsed){
        $(elem).parent().find(".fa-chevron-up").removeClass("fa-chevron-up").addClass("fa-chevron-down");
    } else {
        $(elem).parent().find(".fa-chevron-down").removeClass("fa-chevron-down").addClass("fa-chevron-up");
        if (elem.id == "bodyBytesThroughputOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshBytesThroughputOverTime(true);
            }
            document.location.href="#bytesThroughputOverTime";
        } else if (elem.id == "bodyLatenciesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesOverTime(true);
            }
            document.location.href="#latenciesOverTime";
        } else if (elem.id == "bodyCustomGraph") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCustomGraph(true);
            }
            document.location.href="#responseCustomGraph";
        } else if (elem.id == "bodyConnectTimeOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshConnectTimeOverTime(true);
            }
            document.location.href="#connectTimeOverTime";
        } else if (elem.id == "bodyResponseTimePercentilesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimePercentilesOverTime(true);
            }
            document.location.href="#responseTimePercentilesOverTime";
        } else if (elem.id == "bodyResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeDistribution();
            }
            document.location.href="#responseTimeDistribution" ;
        } else if (elem.id == "bodySyntheticResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshSyntheticResponseTimeDistribution();
            }
            document.location.href="#syntheticResponseTimeDistribution" ;
        } else if (elem.id == "bodyActiveThreadsOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshActiveThreadsOverTime(true);
            }
            document.location.href="#activeThreadsOverTime";
        } else if (elem.id == "bodyTimeVsThreads") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTimeVsThreads();
            }
            document.location.href="#timeVsThreads" ;
        } else if (elem.id == "bodyCodesPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCodesPerSecond(true);
            }
            document.location.href="#codesPerSecond";
        } else if (elem.id == "bodyTransactionsPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTransactionsPerSecond(true);
            }
            document.location.href="#transactionsPerSecond";
        } else if (elem.id == "bodyTotalTPS") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTotalTPS(true);
            }
            document.location.href="#totalTPS";
        } else if (elem.id == "bodyResponseTimeVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeVsRequest();
            }
            document.location.href="#responseTimeVsRequest";
        } else if (elem.id == "bodyLatenciesVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesVsRequest();
            }
            document.location.href="#latencyVsRequest";
        }
    }
}

/*
 * Activates or deactivates all series of the specified graph (represented by id parameter)
 * depending on checked argument.
 */
function toggleAll(id, checked){
    var placeholder = document.getElementById(id);

    var cases = $(placeholder).find(':checkbox');
    cases.prop('checked', checked);
    $(cases).parent().children().children().toggleClass("legend-disabled", !checked);

    var choiceContainer;
    if ( id == "choicesBytesThroughputOverTime"){
        choiceContainer = $("#choicesBytesThroughputOverTime");
        refreshBytesThroughputOverTime(false);
    } else if(id == "choicesResponseTimesOverTime"){
        choiceContainer = $("#choicesResponseTimesOverTime");
        refreshResponseTimeOverTime(false);
    }else if(id == "choicesResponseCustomGraph"){
        choiceContainer = $("#choicesResponseCustomGraph");
        refreshCustomGraph(false);
    } else if ( id == "choicesLatenciesOverTime"){
        choiceContainer = $("#choicesLatenciesOverTime");
        refreshLatenciesOverTime(false);
    } else if ( id == "choicesConnectTimeOverTime"){
        choiceContainer = $("#choicesConnectTimeOverTime");
        refreshConnectTimeOverTime(false);
    } else if ( id == "responseTimePercentilesOverTime"){
        choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        refreshResponseTimePercentilesOverTime(false);
    } else if ( id == "choicesResponseTimePercentiles"){
        choiceContainer = $("#choicesResponseTimePercentiles");
        refreshResponseTimePercentiles();
    } else if(id == "choicesActiveThreadsOverTime"){
        choiceContainer = $("#choicesActiveThreadsOverTime");
        refreshActiveThreadsOverTime(false);
    } else if ( id == "choicesTimeVsThreads"){
        choiceContainer = $("#choicesTimeVsThreads");
        refreshTimeVsThreads();
    } else if ( id == "choicesSyntheticResponseTimeDistribution"){
        choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        refreshSyntheticResponseTimeDistribution();
    } else if ( id == "choicesResponseTimeDistribution"){
        choiceContainer = $("#choicesResponseTimeDistribution");
        refreshResponseTimeDistribution();
    } else if ( id == "choicesHitsPerSecond"){
        choiceContainer = $("#choicesHitsPerSecond");
        refreshHitsPerSecond(false);
    } else if(id == "choicesCodesPerSecond"){
        choiceContainer = $("#choicesCodesPerSecond");
        refreshCodesPerSecond(false);
    } else if ( id == "choicesTransactionsPerSecond"){
        choiceContainer = $("#choicesTransactionsPerSecond");
        refreshTransactionsPerSecond(false);
    } else if ( id == "choicesTotalTPS"){
        choiceContainer = $("#choicesTotalTPS");
        refreshTotalTPS(false);
    } else if ( id == "choicesResponseTimeVsRequest"){
        choiceContainer = $("#choicesResponseTimeVsRequest");
        refreshResponseTimeVsRequest();
    } else if ( id == "choicesLatencyVsRequest"){
        choiceContainer = $("#choicesLatencyVsRequest");
        refreshLatenciesVsRequest();
    }
    var color = checked ? "black" : "#818181";
    choiceContainer.find("label").each(function(){
        this.style.color = color;
    });
}

