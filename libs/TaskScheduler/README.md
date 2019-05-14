 ### TaskScheduler class
 
Runs callback by given interval and data for each tasks

#### Usage:

```js

const tasks = [
  {
     body: {
       foo: 'bar',
     },
     interval: 60, // 1 minute
  }
];

const scheduler = new TaskScheduler(tasks, { precision: 30 }, async (data) => {
  console.log(data); // { foo: 'bar' }
});

```
