'use client';

import {
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  CollectionReference,
  DocumentReference,
  SetOptions,
} from 'firebase/firestore';
import { errorEmitter } from './error-emitter';
import { FirestorePermissionError } from './errors';

/**
 * Initiates a setDoc operation for a document reference.
 * Does NOT await the write operation internally but handles permission errors.
 */
export function setDocumentNonBlocking(docRef: DocumentReference, data: any, options: SetOptions) {
  setDoc(docRef, data, options).catch(error => {
    // Check if the error is likely a permission error before creating a contextual one.
    if (error.code === 'permission-denied') {
      const contextualError = new FirestorePermissionError({
        path: docRef.path,
        operation: 'write', // Simplified for setDoc
        requestResourceData: data,
      });
      errorEmitter.emit('permission-error', contextualError);
    } else {
      console.error("setDocumentNonBlocking Firestore Error:", error);
    }
  });
  // Execution continues immediately
}

/**
 * Initiates an addDoc operation for a collection reference.
 * Does NOT await the write operation internally but handles permission errors.
 * Returns the Promise for the new doc ref, but typically not awaited by caller.
 */
export function addDocumentNonBlocking(colRef: CollectionReference, data: any) {
  const promise = addDoc(colRef, data).catch(error => {
    if (error.code === 'permission-denied') {
      const contextualError = new FirestorePermissionError({
        path: colRef.path,
        operation: 'create',
        requestResourceData: data,
      });
      console.error("Firestore Permission Denied:", contextualError.message);
      errorEmitter.emit('permission-error', contextualError);
    } else {
      console.error("addDocumentNonBlocking Firestore Error:", error);
    }
    // Re-throw to allow the original caller's .catch to trigger if needed
    throw error;
  });
  return promise;
}

/**
 * Initiates an updateDoc operation for a document reference.
 * Does NOT await the write operation internally but handles permission errors.
 */
export function updateDocumentNonBlocking(docRef: DocumentReference, data: any) {
  updateDoc(docRef, data).catch(error => {
    if (error.code === 'permission-denied') {
      const contextualError = new FirestorePermissionError({
        path: docRef.path,
        operation: 'update',
        requestResourceData: data,
      });
      errorEmitter.emit('permission-error', contextualError);
    } else {
      console.error("updateDocumentNonBlocking Firestore Error:", error);
    }
  });
}

/**
 * Initiates a deleteDoc operation for a document reference.
 * Does NOT await the write operation internally but handles permission errors.
 */
export function deleteDocumentNonBlocking(docRef: DocumentReference) {
  deleteDoc(docRef).catch(error => {
    if (error.code === 'permission-denied') {
      const contextualError = new FirestorePermissionError({
        path: docRef.path,
        operation: 'delete',
      });
      errorEmitter.emit('permission-error', contextualError);
    } else {
      console.error("deleteDocumentNonBlocking Firestore Error:", error);
    }
  });
}
