export const readableStream = new ReadableStream({
  start(controller) {
    controller.enqueue("x");
    controller.enqueue("y");
    controller.enqueue("c");

    controller.close();
  },
});


