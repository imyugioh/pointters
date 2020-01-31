import { Component } from '@angular/core';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap/modal/modal-ref";

@Component({
  selector: 'app-info-modal',
  templateUrl: './info-modal.component.html',
  styleUrls: ['./info-modal.component.css']
})

export class InfoModalComponent {
  private text: string = "";

  constructor(
    private activeModal: NgbActiveModal
  ) { }

  closeModal = () => {
      this.activeModal.close();
  }

}
