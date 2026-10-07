import { Injectable } from "@angular/core";

import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ModalfinishtreatComponent } from "../../Components/Modals/modalfinishtreat/modalfinishtreat.component";
import { ModalTeamInfoComponent } from "../../Components/Modals/modal-team-info/modal-team-info.component";
import { ModalEstimateComponent } from "../../Components/Modals/modal-estimate/modal-estimate.component";

import { ModalDescriptionEligibleComponent } from "../../Components/Modals/modal-description-eligible/modal-description-eligible.component";
import { ModalDisplayPhotoComponent } from "../../Components/Modals/modal-display-photo/modal-display-photo.component";
import { ModalPlanDetailsComponent } from "../../Components/Modals/modal-plan-details/modal-plan-details.component";

import { ModalDisplayReportComponent } from "../../Components/Modals/modal-display-report/modal-display-report.component";
import { AppService } from "../Services/app.service";
import { ModalRemoveTeamComponent } from "../../Components/Modals/modal-remove-team/modal-remove-team.component";
import { ModalDisplayItemPlanComponent } from "../../Components/Modals/modal-display-item-plan/modal-display-item-plan.component";
import { ModalChatComponent } from "../../Components/Modals/modal-chat/modal-chat.component";
@Injectable({
  providedIn: "root",
})
export class ModalService {
  plan$!: any;

  modalRefPlan: any = {};

  constructor(private modalService: NgbModal, private appService: AppService) {}
  ngOnInit(): void {
    this.appService.getPlan$.subscribe((data) => {
      this.plan$ = data;
      this.modalRefPlan!.componentInstance.plan! = this.plan$;
    });
  }
  open(data: any, isCompleted: any) {
    const modalRef = this.modalService.open(ModalfinishtreatComponent, {
      size: "lg",
    });

    modalRef.componentInstance.data = data;
    modalRef.componentInstance.isCompleted = isCompleted;
  }

  close() {
    this.modalService.dismissAll();
  }

  openTeamModal(treatment: any) {
    const modalRef = this.modalService.open(ModalTeamInfoComponent, {
      size: "lg",
    });

    modalRef.componentInstance.treatment = treatment;
  }

  openRemoveTeamModal(treat: any) {
    const modalRef = this.modalService.open(ModalRemoveTeamComponent, {
      size: "lg",
    });

    modalRef.componentInstance.treatment = treat;
  }

  openEtimateModel() {
    const modalRef = this.modalService.open(ModalEstimateComponent, {
      size: "lg",
    });
  }

  openDescriptionEligibleModal(treatment: any) {
    const modalRef = this.modalService.open(ModalDescriptionEligibleComponent, {
      size: "lg",
    });

    modalRef.componentInstance.treatment = treatment;

    return modalRef.result;
  }
  openChatModal(treatment: any) {
    const modalRef = this.modalService.open(ModalChatComponent, {
      size: "lg",
      backdropClass: "custom-modal-backdrop",
      centered: true,
    });

    modalRef.componentInstance.treatment = treatment;
  }

  openDisplayPhtotoModel(data: any) {
    const modalRef = this.modalService.open(ModalDisplayPhotoComponent, {
      size: "lg",
      backdropClass: "custom-modal-backdrop",
      centered: true,
    });

    modalRef.componentInstance.data = data;
  }

  openDisplayPhtotoPlanModel(data: any) {
    const modalRef = this.modalService.open(ModalDisplayItemPlanComponent, {
      size: "lg",
      backdropClass: "custom-modal-backdrop",
      centered: true,
    });

    modalRef.componentInstance.data = data;
  }

  openDisplayPlanModel(plan: any, treatment: any) {
    this.modalRefPlan = this.modalService.open(ModalPlanDetailsComponent, {
      size: "lg",
    });

    // this.modalRefPlan.componentInstance.plan = this.plan$;
    this.modalRefPlan.componentInstance.plan = plan;
    this.modalRefPlan.componentInstance.treatment = treatment;
  }

  openDisplayReportModel(data: any) {
    const modalRef = this.modalService.open(ModalDisplayReportComponent, {
      size: "lg",
    });

    modalRef.componentInstance.data = data;
  }
}
