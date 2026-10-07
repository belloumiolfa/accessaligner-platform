'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">front-end documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#components-links"' :
                            'data-bs-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/AcceptDecisionComponent.html" data-type="entity-link" >AcceptDecisionComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AcceptFormComponent.html" data-type="entity-link" >AcceptFormComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AccountFormComponent.html" data-type="entity-link" >AccountFormComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ActivitiesComponent.html" data-type="entity-link" >ActivitiesComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AddFileComponent.html" data-type="entity-link" >AddFileComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AddNewPatientComponent.html" data-type="entity-link" >AddNewPatientComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AddNewPlanComponent.html" data-type="entity-link" >AddNewPlanComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AddNewTreatmentComponent.html" data-type="entity-link" >AddNewTreatmentComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AdminDecisionComponent.html" data-type="entity-link" >AdminDecisionComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AppComponent.html" data-type="entity-link" >AppComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ArchiveDoctorsComponent.html" data-type="entity-link" >ArchiveDoctorsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ArchiveTreatmentsComponent.html" data-type="entity-link" >ArchiveTreatmentsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/BackHomeComponent.html" data-type="entity-link" >BackHomeComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/BlockHeaderComponent.html" data-type="entity-link" >BlockHeaderComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ClinicsComponent.html" data-type="entity-link" >ClinicsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ComingPageComponent.html" data-type="entity-link" >ComingPageComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/CompanyDetailsComponent.html" data-type="entity-link" >CompanyDetailsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ConfirmationComponent.html" data-type="entity-link" >ConfirmationComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ConfirmDecisionComponent.html" data-type="entity-link" >ConfirmDecisionComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ConfirmFormComponent.html" data-type="entity-link" >ConfirmFormComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ContentDevisTreatComponent.html" data-type="entity-link" >ContentDevisTreatComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/DashboardComponent.html" data-type="entity-link" >DashboardComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/Error403Component.html" data-type="entity-link" >Error403Component</a>
                            </li>
                            <li class="link">
                                <a href="components/Error500Component.html" data-type="entity-link" >Error500Component</a>
                            </li>
                            <li class="link">
                                <a href="components/Error503Component.html" data-type="entity-link" >Error503Component</a>
                            </li>
                            <li class="link">
                                <a href="components/FinishTreatmentComponent.html" data-type="entity-link" >FinishTreatmentComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ForgetPasswordComponent.html" data-type="entity-link" >ForgetPasswordComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/GetPlansTreatComponent.html" data-type="entity-link" >GetPlansTreatComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/GridUsersComponent.html" data-type="entity-link" >GridUsersComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/HelpLinkComponent.html" data-type="entity-link" >HelpLinkComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/InfoProfileMenuComponent.html" data-type="entity-link" >InfoProfileMenuComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/InfosComponent.html" data-type="entity-link" >InfosComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LayoutContainerComponent.html" data-type="entity-link" >LayoutContainerComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LeftSidebarComponent.html" data-type="entity-link" >LeftSidebarComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LeftSidebarMobilComponent.html" data-type="entity-link" >LeftSidebarMobilComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LinksComponent.html" data-type="entity-link" >LinksComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ListDoctorsComponent.html" data-type="entity-link" >ListDoctorsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ListUsersComponent.html" data-type="entity-link" >ListUsersComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LockedScreenComponent.html" data-type="entity-link" >LockedScreenComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LogoComponent.html" data-type="entity-link" >LogoComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/MenuAppComponent.html" data-type="entity-link" >MenuAppComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/MiniLeftbarComponent.html" data-type="entity-link" >MiniLeftbarComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ModalDescriptionEligibleComponent.html" data-type="entity-link" >ModalDescriptionEligibleComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ModalDisplayItemPlanComponent.html" data-type="entity-link" >ModalDisplayItemPlanComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ModalDisplayPhotoComponent.html" data-type="entity-link" >ModalDisplayPhotoComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ModalDisplayReportComponent.html" data-type="entity-link" >ModalDisplayReportComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ModalEstimateComponent.html" data-type="entity-link" >ModalEstimateComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ModalfinishtreatComponent.html" data-type="entity-link" >ModalfinishtreatComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ModalPlanDetailsComponent.html" data-type="entity-link" >ModalPlanDetailsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ModalRemoveTeamComponent.html" data-type="entity-link" >ModalRemoveTeamComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ModalTeamInfoComponent.html" data-type="entity-link" >ModalTeamInfoComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/NewAdminComponent.html" data-type="entity-link" >NewAdminComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/NewPlanComponent.html" data-type="entity-link" >NewPlanComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/NewTreatClinicsComponent.html" data-type="entity-link" >NewTreatClinicsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/NewTreatGeneralComponent.html" data-type="entity-link" >NewTreatGeneralComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/NewTreatPatientComponent.html" data-type="entity-link" >NewTreatPatientComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/NewTreatPhotosComponent.html" data-type="entity-link" >NewTreatPhotosComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/NewTreatTeethComponent.html" data-type="entity-link" >NewTreatTeethComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/NewUserDetailsComponent.html" data-type="entity-link" >NewUserDetailsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/NotifMenuComponent.html" data-type="entity-link" >NotifMenuComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/OfflineComponent.html" data-type="entity-link" >OfflineComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/OverlayMenuComponent.html" data-type="entity-link" >OverlayMenuComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/OverviewComponent.html" data-type="entity-link" >OverviewComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/PatientComponent.html" data-type="entity-link" >PatientComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/PatientDetailComponent.html" data-type="entity-link" >PatientDetailComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/PatientDisplayInformationsComponent.html" data-type="entity-link" >PatientDisplayInformationsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/PatientFormComponent.html" data-type="entity-link" >PatientFormComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/PatientInfosComponent.html" data-type="entity-link" >PatientInfosComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/PatientListComponent.html" data-type="entity-link" >PatientListComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/PatientTreatClinicsInformationsComponent.html" data-type="entity-link" >PatientTreatClinicsInformationsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/PatientTreatInformationsComponent.html" data-type="entity-link" >PatientTreatInformationsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/PatientTreatPhotosInformationsComponent.html" data-type="entity-link" >PatientTreatPhotosInformationsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/PatientTreatTeethInformationsComponent.html" data-type="entity-link" >PatientTreatTeethInformationsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/PhotoFormComponent.html" data-type="entity-link" >PhotoFormComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/PhotographsComponent.html" data-type="entity-link" >PhotographsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/PlanComponent.html" data-type="entity-link" >PlanComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/PlanListComponent.html" data-type="entity-link" >PlanListComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/PreloaderComponent.html" data-type="entity-link" >PreloaderComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ProfileComponent.html" data-type="entity-link" >ProfileComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ProfileImageComponent.html" data-type="entity-link" >ProfileImageComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/PublicLayoutComponent.html" data-type="entity-link" >PublicLayoutComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/QuoteReportComponent.html" data-type="entity-link" >QuoteReportComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/RigthSidebarComponent.html" data-type="entity-link" >RigthSidebarComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ScheduleComponent.html" data-type="entity-link" >ScheduleComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SecurityFormComponent.html" data-type="entity-link" >SecurityFormComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SettingsComponent.html" data-type="entity-link" >SettingsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SignInComponent.html" data-type="entity-link" >SignInComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SignUpComponent.html" data-type="entity-link" >SignUpComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TaskMenuComponent.html" data-type="entity-link" >TaskMenuComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TeamInfoComponent.html" data-type="entity-link" >TeamInfoComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TeethComponent.html" data-type="entity-link" >TeethComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TimelineTreatmentsComponent.html" data-type="entity-link" >TimelineTreatmentsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TreatmentComponent.html" data-type="entity-link" >TreatmentComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TreatmentConfirmationComponent.html" data-type="entity-link" >TreatmentConfirmationComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TreatmentDetailsComponent.html" data-type="entity-link" >TreatmentDetailsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TreatmentEligibleComponent.html" data-type="entity-link" >TreatmentEligibleComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TreatmentHeaderComponent.html" data-type="entity-link" >TreatmentHeaderComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TreatmentListComponent.html" data-type="entity-link" >TreatmentListComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TreatmentsComponent.html" data-type="entity-link" >TreatmentsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TreatmentStatusComponent.html" data-type="entity-link" >TreatmentStatusComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/UpdatePasswordComponent.html" data-type="entity-link" >UpdatePasswordComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/UpdatePatientComponent.html" data-type="entity-link" >UpdatePatientComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/UsersOverviewComponent.html" data-type="entity-link" >UsersOverviewComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/UsersPageComponent.html" data-type="entity-link" >UsersPageComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/WaitingComponent.html" data-type="entity-link" >WaitingComponent</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#directives-links"' :
                                'data-bs-target="#xs-directives-links"' }>
                                <span class="icon ion-md-code-working"></span>
                                <span>Directives</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="directives-links"' : 'id="xs-directives-links"' }>
                                <li class="link">
                                    <a href="directives/GetPhotoDirective.html" data-type="entity-link" >GetPhotoDirective</a>
                                </li>
                            </ul>
                        </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AdminService.html" data-type="entity-link" >AdminService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AppService.html" data-type="entity-link" >AppService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthRequestsService.html" data-type="entity-link" >AuthRequestsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/EstimateService.html" data-type="entity-link" >EstimateService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FileService.html" data-type="entity-link" >FileService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HandleAlertsService.html" data-type="entity-link" >HandleAlertsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HandleErrorsService.html" data-type="entity-link" >HandleErrorsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ModalService.html" data-type="entity-link" >ModalService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NetworkService.html" data-type="entity-link" >NetworkService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PatientService.html" data-type="entity-link" >PatientService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PlanService.html" data-type="entity-link" >PlanService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SearchService.html" data-type="entity-link" >SearchService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/StatusClassService.html" data-type="entity-link" >StatusClassService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/StepsService.html" data-type="entity-link" >StepsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TreatmentService.html" data-type="entity-link" >TreatmentService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserService.html" data-type="entity-link" >UserService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UtilsService.html" data-type="entity-link" >UtilsService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#guards-links"' :
                            'data-bs-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AuthGuard.html" data-type="entity-link" >AuthGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/MenuItem.html" data-type="entity-link" >MenuItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MenuItem-1.html" data-type="entity-link" >MenuItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SignUpObject.html" data-type="entity-link" >SignUpObject</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/updatePasswordObject.html" data-type="entity-link" >updatePasswordObject</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/User.html" data-type="entity-link" >User</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});