declare module "fawn" {
    import { Mongoose } from "mongoose";
  
    class Task {
      /**
       * Adds an update operation to the task.
       * @param collectionName - The name of the collection to update.
       * @param query - The query object to match documents.
       * @param update - The update object.
       * @returns The Task instance for chaining.
       */
      update(collectionName: string, query: object, update: object): this;
  
      /**
       * Adds a save operation to the task.
       * @param collectionName - The name of the collection to save into.
       * @param document - The document to save.
       * @returns The Task instance for chaining.
       */
      save(collectionName: string, document: object): this;
  
      /**
       * Adds a remove operation to the task.
       * @param collectionName - The name of the collection to remove from.
       * @param query - The query object to match documents.
       * @returns The Task instance for chaining.
       */
      remove(collectionName: string, query: object): this;
  
      /**
       * Executes all operations in the task.
       * @returns A promise that resolves when the task is complete.
       */
      run(): Promise<any>;
    }
  
    interface Fawn {
      /**
       * Initializes Fawn with a Mongoose instance.
       * @param mongoose - The Mongoose instance to use.
       */
      init(mongoose: Mongoose): void;
  
      /**
       * Creates a new Task instance for transactional operations.
       */
      Task: typeof Task;
    }
  
    const fawn: Fawn;
    export default fawn;
  }
  