import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';

import Swal from 'sweetalert2';

import FileItem from '../models/FileItem';

@Directive({
  selector: '[appNgDropFiles]'
})
export class NgDropFilesDirective {

  @Input() files: FileItem[] = [];
  @Output() mouseOn: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  @HostListener('dragover', ['$event'])
  public onDragEnter(event: any): void {
    this.mouseOn.emit(true);
    this._preventStop(event);
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave(event: any): void {
    this.mouseOn.emit(false);
  }

  @HostListener('drop', ['$event'])
  public onDrop(event: any): void {
    const transfer = this._getTransfer(event);
    if (!transfer) return;

    this._getFiles(transfer.files);
    this._preventStop(event);

    this.mouseOn.emit(false);
  }

  // Extract data
  private _getTransfer(event: any): any {
    return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
  }

  private _getFiles(fileList: FileList): void {
    for (const property in Object.getOwnPropertyNames(fileList)) {
      const fileTemp = fileList[property];

      if (this._fileCanUpload(fileTemp)) {
        const newFile = new FileItem(fileTemp);
        this.files.push(newFile);
      }
    }

    console.log(this.files);
  }

  // Validations
  private _fileCanUpload(file: File): boolean {
    if (!this._fileIsDropped(file.name) && this._isImage(file.type)) return true;
    else return false;
  }

  private _preventStop(event: any): void {
    event.preventDefault();
    event.stopPropagation();
  }

  private _fileIsDropped(fileName: string): boolean {
    for (const file of this.files) {
      if (file.fileName === fileName) {
        Swal.fire({
          icon: 'warning',
          title: 'Oops...',
          text: `The ${fileName} file is already added`
        })

        return true;
      }
    }

    return false;
  }

  private _isImage(fileType: string): boolean {
    return (fileType === '' || fileType === undefined) ? false : fileType.startsWith('image');
  }

}
