Another mining method.

There has been a server created for returning a hash of difficulty 4. That means 4 zeros has to be in front.

https://sleepy-cove-43230.herokuapp.com

When making a post request. 
![mother](https://github.com/expert26111/MotherProcessBlockhain/blob/master/herokurequest.png)

A block object has to be passed and mining is performed and hash is returned.
The problem that occurs here if the strategy for creating a few servers like this and nonce starting from 0 to 200 for first and 200 to 400 for second and ect then which ajax request returned faster. This requires some advanced javascript code.

Another way for mining different than while loop was using the child-process npm module. On a condition here another node.js script can be started and the result of it used. The main problem with this approach is that on message received from the child process a global variable has to be changed.  
Link for the child process : https://github.com/expert26111/ChildProcessCode/blob/master/mining1.js
Link for the main code:
https://github.com/expert26111/MotherProcessBlockhain/blob/master/main.js
![another way](https://github.com/expert26111/MotherProcessBlockhain/blob/master/postrequest.png)

The picture above shows how it works only the main.js is runned with the command node main.js and in the method _addBlock the mining will be done it separate script accessed on given path. 

On other hand if the project was implemented with Java then we could you use Futures structure and implement successfully the mining. 

