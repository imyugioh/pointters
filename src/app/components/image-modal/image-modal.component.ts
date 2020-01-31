import { Component, Input, OnDestroy } from '@angular/core';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap/modal/modal-ref";

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.css']
})

export class ImageModalComponent {

  private src: string;

  constructor(
    private activeModal: NgbActiveModal
  ) { }

  ngOnDestroy() {
    let style = document.querySelector('style#modalStyle');
    document.querySelector('head').removeChild(style);
  }

  closeModal = () => {
    this.activeModal.close();
  }
}
