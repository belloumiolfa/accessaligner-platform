package access.aligner.backend.Services.Implimentation;

import access.aligner.backend.AdvicerController.ResourceNotFoundException;
import access.aligner.backend.DTOs.AdminDTO;
import access.aligner.backend.DTOs.FileDTO;
import access.aligner.backend.DTOs.Mappers.AdminDTOMapper;
import access.aligner.backend.DTOs.Mappers.FileDTOMapper;
import access.aligner.backend.DTOs.Mappers.TreatDtoMapper;
import access.aligner.backend.DTOs.Mappers.TreatmentDTOMapper;
import access.aligner.backend.DTOs.Records.TreatDto;
import access.aligner.backend.DTOs.Requests.InfosTreatRequest;
import access.aligner.backend.DTOs.Requests.TeethObject;
import access.aligner.backend.DTOs.Requests.TeethRequest;
import access.aligner.backend.DTOs.Responces.MessageResponse;
import access.aligner.backend.DTOs.TreatmentDTO;
import access.aligner.backend.Entities.*;
import access.aligner.backend.Entities.Keys.TreatTeamKey;
import access.aligner.backend.Enum.Enum_Role;
import access.aligner.backend.Enum.Enum_Status;
import access.aligner.backend.Repositories.*;
import access.aligner.backend.Services.FileService;
import access.aligner.backend.Services.TreatmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.net.MalformedURLException;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TreatmentServiceImpl implements TreatmentService {
    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;
    private final TreatmentRepository treatmentRepository;
    private final TreatmentDTOMapper treatmentDTOMapper;
    private final TeethRepository teethRepository;
    private final FileRepository fileRepository;
    private final FileService fileService;
    private final EstimateRepository estimateRepository;
    private final PlanRepository planRepository;
    private final UserRepository userRepository;
    private final TreatmentTeamRepository treatmentTeamRepository;
    private final AdminRepository adminRepository;
    private final AdminDTOMapper adminDTOMapper;
    private final FileDTOMapper fileDTOMapper;
    private final MessageRepository messageRepository;
    /**
     * **************
     */
    private final TreatDtoMapper treatDtoMapper;
    ResourceBundle messages = ResourceBundle.getBundle("messages");


    @Override
    public TreatmentDTO addInfo(InfosTreatRequest data, Long patientId, Locale locale) {
         // get new (current ) treatment
        Optional<Treatment> treatment= getPatientTreatments(patientId)
                .stream()
                .filter(t->t.getStatus()!=Enum_Status.valueOf("CANCELED")
                && t.getStatus()!=Enum_Status.valueOf("FINISHED")
                && t.getStatus()!=Enum_Status.valueOf("UNQUALIFIED")
                ).findFirst();

        // If there is no current treat so build new one
        if(treatment.isEmpty()){

            Patient patient = patientRepository.findById(patientId)
                    .orElseThrow(() -> new ResourceNotFoundException("Patient not found"));

            Treatment newTreat =Treatment.builder()
                    .antCross(data.getAntCross())
                    .classI(data.getClassI())
                    .crowding(data.getCrowding())
                    .extract(data.getExtract())
                    .gap(data.getGap())
                    .overbite(data.getOverbite())
                    .treat(data.getTreat())
                    .postCross(data.getPostCross())
                    .reduceOverbite(data.getReduceOverbite())
                    .patient(patient)
                    .description(data.getDescription())
                    .status(Enum_Status.valueOf("NEW"))
                    .build();
            // save the new treatment
            treatmentRepository.save (newTreat );
              return treatmentDTOMapper.apply(newTreat , locale);
        }
        // If there is a current treatment the update it with new values
        Treatment newTreat = treatment.orElseThrow(
                () -> new ResourceNotFoundException("Current treatment not found"));
        newTreat.setAntCross(data.getAntCross());
        newTreat.setClassI(data.getClassI());
        newTreat.setCrowding(data.getCrowding());
        newTreat.setExtract(data.getExtract());
        newTreat.setGap(data.getGap());
        newTreat.setOverbite(data.getOverbite());
        newTreat.setTreat(data.getTreat());
        newTreat.setPostCross(data.getPostCross());
        newTreat.setReduceOverbite(data.getReduceOverbite());
        newTreat.setDescription(data.getDescription());
         newTreat.setUpdatedAt(new Date());

        return treatmentDTOMapper.apply(treatmentRepository.save(newTreat), locale);
    }
    @Override
    public Treatment getTreatment(Long id) {
        return treatmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Treatment not found"));
    }
    @Override
    public Collection<Treatment> getPatientTreatments(Long patientId){

        // Safely fetch the patient using Optional
        Optional<Patient> patientOpt = patientRepository.findById(patientId);

        // Check if the patient exists
        return patientOpt.map(treatmentRepository::findByPatient).orElseGet(Collections::emptyList);
    }
    @Override
    public TreatmentDTO getCurrentTreatment(Long patientId, Locale locale) {

        // Get all treatments associated to this aptient
        Collection<Treatment> treatments =getPatientTreatments(patientId);

        if(treatments.size()>0) {

            Treatment currentTreatment= getPatientTreatments(patientId)
                    .stream()
                    .filter(t -> t.getStatus() != Enum_Status.valueOf("FINISHED")
                            && t.getStatus() != Enum_Status.valueOf("CANCELED"))
                    .findFirst().orElse(null);

            if(currentTreatment!=null){
                 return treatmentDTOMapper.apply(currentTreatment, locale);
            }
            return null;

        }
        return null;

    }
    @Override
    public TreatmentDTO addTeeth(TeethRequest data, Long treatId, Locale locale) {
        // Get current treatment
        Treatment treatment = treatmentRepository.findById(treatId)
                .orElseThrow(() -> new ResourceNotFoundException("Treatment not found"));
        treatment.setUpdatedAt(new Date());
        treatment.setTeethComment(data.getComment());

        // delete old teeth associated to current treatment
        teethRepository.deleteAll(teethRepository.findByTreatment(treatment));

        // Map teeth data and build for each one a teeth and save it
        for (TeethObject teeth:data.getTeeth()) {
            Teeth newTeeth= Teeth.builder()
                    .num(teeth.getNum())
                    .action(teeth.getStatus())
                    .treatment(treatment)
                    .build();

            teethRepository.save(newTeeth);
        }

        return treatmentDTOMapper.apply(treatment, locale) ;
    }
    @Override
    public TreatmentDTO addPhotos(MultipartFile[] photos, Long treatId,String comment, String role , Locale locale)
            throws IOException {
        // Get current treatment
        Treatment treatment = treatmentRepository.findById(treatId)
                .orElseThrow(() -> new ResourceNotFoundException("Treatment not found"));
        treatment.setUpdatedAt(new Date());

         if(role.equals("photo")==true ){
            treatment.setPhotosComment(comment);

        }else if(role.equals("clinic")==true){
            treatment.setClinicsComment(comment);
        }

        if(photos!=null && photos.length!=0) {
             for (MultipartFile photo : photos) {

                File file = fileService.saveFile(photo,
                        "Treat-" + treatment.getId());
                file.setTreatment(treatment);
                file.setRole(role);

                fileRepository.save(file);
            }
        }
        return treatmentDTOMapper.apply(treatmentRepository.save(treatment), locale);
    }
    @Override
    public FileDTO addPhoto(MultipartFile photo, Long treatId, String role) throws IOException {
        // Get current treatment
        Treatment treatment = treatmentRepository.findById(treatId)
                .orElseThrow(() -> new ResourceNotFoundException("Treatment not found"));
        treatment.setUpdatedAt(new Date());

        File file = fileService.saveFile(photo, "Treat-" + treatment.getId());
        file.setTreatment(treatment);
        file.setRole(role);

        return fileDTOMapper.apply(fileRepository.save(file));
    }

    @Override
    public Resource getTreatPhoto(Long fileId, Long treatId) throws MalformedURLException {
        File file = fileRepository.findById(fileId)
                .orElseThrow(() -> new ResourceNotFoundException("File not found"));

        if (file.getRole().equals("clinic") || file.getRole().equals("photo")) {
                return fileService.getFile(file.getId(),"Treat-" +treatId );

            }else {
                if (file.getPlan() == null) {
                    throw new ResourceNotFoundException("Plan not found for file");
                }
                return fileService.getFile(file.getId(),
                        "Plan-"+file.getPlan().getId()+"-Treat-"+treatId );
            }
    }

    @Override
    public TreatmentDTO updateStatus(Long treatId, String status, Locale locale) {

        Treatment treatment = treatmentRepository.findById(treatId)
                .orElseThrow(() -> new ResourceNotFoundException("Treatment not found"));
        treatment.setPreviousStatus(treatment.getStatus().name());
        // get status by default if there is a plan so put it as in progress
        // if plan is in production or in delevery get plan status
        treatment.setStatus(Enum_Status.valueOf(status));
        treatment.setUpdatedAt(new Date());

        treatment=treatmentRepository.save(treatment);

        return treatmentDTOMapper.apply(treatment, locale);
    }
    @Override
    public List<TreatmentDTO> getTreatments(Locale locale) {

        List<Treatment> treatments = treatmentRepository
                .findAll(Sort.by(Sort.Direction.DESC,"createdAt"));
        List<TreatmentDTO> result = new ArrayList<TreatmentDTO>(treatments.size());

        for (Treatment treatment:treatments) {
            result.add(treatmentDTOMapper.apply(treatment, locale));
        }
        return result;
    }
    @Override
    public List<TreatmentDTO> deleteTreatment(Long treatId, Locale locale) {

        Treatment treatment = treatmentRepository.findById(treatId)
                .orElseThrow(() -> new ResourceNotFoundException("Treatment not found"));

        // delete files related to treatment
        Set<File> files= fileRepository.findByTreatment(treatment);
        if(!files.isEmpty()) {
            for (File file : files
             ) {
                Optional<Estimate> estimate =estimateRepository.findByFile(file);
                estimate.ifPresent(estimateRepository::delete);
            }
            fileRepository.deleteAll(files);
        }

        // delete teeth related to treatment
        teethRepository.deleteAll(teethRepository.findByTreatment(treatment));

        // delete plan related to this treatment
        Set<Plan> plans= planRepository.findByTreatment(treatment);
        if(!plans.isEmpty()) {
            for (Plan plan : plans
             ) {
                 fileRepository.deleteAll(fileRepository.findByPlan(plan));
            }
            planRepository.deleteAll(plans);
        }
        // delete treatment from admin project
        Set<TreatmentTeam> projects = treatmentTeamRepository.findByProject(treatment);
        treatmentTeamRepository.deleteAll(projects);

        // delete messages
        List<Message> messages=messageRepository.findByTreatment(treatment);
        messageRepository.deleteAll(messages);

        // delete treatment
        treatmentRepository.delete(treatment);

        return getTreatments( locale);
    }
    @Override
    public List<TreatmentDTO> getPatientTreats(Long patientId, Locale locale) {
        Collection<Treatment>treats= getPatientTreatments(patientId);

        List<TreatmentDTO> result = new ArrayList<>();
        for (Treatment treat:treats) {
            result.add(treatmentDTOMapper.apply(treat, locale));
        }
        return result;
    }
    @Override
    public TreatmentDTO getTreatmentById(Long treatId, Locale locale) {
        return treatmentDTOMapper.apply(treatmentRepository.findById(treatId)
                .orElseThrow(() -> new ResourceNotFoundException("Treatment not found")), locale);
    }
    @Override
    @Transactional(readOnly = true)
    public Integer getTreatmentNbr(Long userId) {
        Integer result =0;
         User user = userRepository.findById(userId)
                 .orElseThrow(() -> new ResourceNotFoundException("User not found"));
         Set<Role> userRole = user.getRoleList();
         if(userRole.stream().anyMatch(role -> role.getName() == Enum_Role.SUPER_ADMIN)){
             result = treatmentRepository.findAll().size();
         } else if(userRole.stream().anyMatch(role -> role.getName() == Enum_Role.DENTIST)){
             // get patients , foreach patient to get treatments and calculate treatments
             Doctor doctor = doctorRepository.findById(userId)
                     .orElseThrow(() -> new ResourceNotFoundException("Doctor not found"));
             Collection<Patient> patients = patientRepository.findByDoctor(doctor);
             for (Patient patient: patients) {
                result=result+ treatmentRepository.findByPatient(patient).size();
             }

         }else {
             result=result + treatmentRepository.findAll().size();
         }
         return result;
    }
    @Override
    public TreatmentDTO addTeam(Long treatId, List<Long> admins, Locale locale) {

        Treatment treatment = treatmentRepository.findById(treatId)
                .orElseThrow(() -> new ResourceNotFoundException("Treatment not found"));
        treatment.setUpdatedAt(new Date());
        for (Long  adminId : admins) {
            Admin admin = adminRepository.findById(adminId)
                    .orElseThrow(() -> new ResourceNotFoundException("Admin not found"));

            TreatmentTeam treatmentTeam= TreatmentTeam.builder()
                    .responsible(admin)
                    .project(treatment)
                    .id(new TreatTeamKey(treatment.getId(),admin.getId()))
                    .build();

            treatment.setTeam(treatmentTeam);

            treatmentTeamRepository.save(treatmentTeam);

        }
        return treatmentDTOMapper.apply(treatment, locale);
    }
    @Override
    public List<AdminDTO> getTeam(Long treatId) {
        List<AdminDTO> result = new ArrayList<>();

        Treatment treatment = treatmentRepository.findById(treatId)
                .orElseThrow(() -> new ResourceNotFoundException("Treatment not found"));
        List <TreatmentTeam> treatmentTeam=treatmentTeamRepository.findByProject(treatment).stream().toList();

        for (TreatmentTeam treat :treatmentTeam) {
            result.add(adminDTOMapper.apply(treat.getResponsible()));
        }
        return result;
    }
    @Override
    public List<AdminDTO> removeTeam(Long treatId, Long adminId) {
        List<TreatmentTeam> treatmentTeam =
                treatmentTeamRepository.findByResponsible(adminRepository.findById(adminId)
                                .orElseThrow(() -> new ResourceNotFoundException("Admin not found")))
                .stream().toList();
        // Remove admin from team treatment

        for (TreatmentTeam treat: treatmentTeam) {
            if(treat.getProject().getId().equals(treatId)) {
                Treatment t=treat.getProject();
                t.setUpdatedAt(new Date());
                treatmentRepository.save( t);

                treatmentTeamRepository.delete(treat);
            }
        }

        return getTeam(treatId);
    }
    @Override
    public MessageResponse resetTeam(Long treatId) {
        List<TreatmentTeam> treatmentTeam =
                treatmentTeamRepository.findByProject(treatmentRepository.findById(treatId)
                                .orElseThrow(() -> new ResourceNotFoundException("Treatment not found")))
                        .stream().toList();

        treatmentTeamRepository.deleteAll(treatmentTeam);
        return MessageResponse.builder().message(messages.getString("TreatmentService.resetTeam.MessageResponse")).build();
    }
    @Override
    public  List<TreatmentDTO> getDoctorTreatments(Long doctorId, Locale locale){
        Doctor doctor = doctorRepository.findById(doctorId)
                .orElseThrow(() -> new ResourceNotFoundException("Doctor not found"));
        Collection <Patient> patients = patientRepository.findByDoctor(doctor);

        List<TreatmentDTO> result = new ArrayList<>();

        for (Patient patient:patients) {

             List <Treatment>treats= (List<Treatment>) treatmentRepository.findByPatient(patient);

             if(treats.size()>0) {
                  for (Treatment treat:treats
                      ) {
                     result.add(treatmentDTOMapper.apply(treat, locale));
                 }
             }
        }
        return result;
    }


    /**
     * **************************************************************************************************
     */


    public boolean hasRole(User user, Enum_Role role) {
        return user.getRoleList().stream()
                .anyMatch(r -> r.getName().equals(role));
    }
    @Override
    public List<TreatDto> getNotArchivedTreatments(Locale locale, String loggedInUsername) {
         User loggedInUser = userRepository.findByEmail(loggedInUsername)
                 .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        List<Enum_Status> statuses = Arrays.asList(
                Enum_Status.CONFIRMED,
                Enum_Status.NEW,
                Enum_Status.COMPLETED,
                Enum_Status.PROGRESS,
                Enum_Status.PRODUCTION,
                Enum_Status.QUALIFIED,
                Enum_Status.DELIVERED
        );

        List<Treatment> treatments = treatmentRepository.findByStatusInOrderByCreatedAtDesc(statuses);

      if (hasRole(loggedInUser, Enum_Role.SUPER_ADMIN)) {
            System.out.println("Logged in user's roles: " +
                    loggedInUser.getRoleList().stream().anyMatch(r -> r.getName().equals(Enum_Role.SUPER_ADMIN))+"/"+treatments
                    .stream()
                    .map(treatment -> treatDtoMapper.toDto(treatment, locale))
                    .collect(Collectors.toList()).size());

            return treatments
                    .stream()
                    .map(treatment -> treatDtoMapper.toDto(treatment, locale))
                    .collect(Collectors.toList());
        }
        else if (hasRole(loggedInUser, Enum_Role.DENTIST)) {
            return treatments
                    .stream()
                    .filter(treatment -> treatment.getPatient().getDoctor().getId().equals(loggedInUser.getId()))
                    .map(treatment -> treatDtoMapper.toDto(treatment, locale))
                    .collect(Collectors.toList());
        } else if(hasRole(loggedInUser, Enum_Role.ADMIN))  {
            return treatments
                    .stream()
                    .filter(treatment -> treatment.getTeam().stream()
                            .anyMatch(member -> member.getResponsible().getId().equals(loggedInUser.getId()))
                    )
                    .map(treatment -> treatDtoMapper.toDto(treatment, locale))
                    .collect(Collectors.toList());
        }else return null;
    }

}
/*
    private boolean filterByUserRole(Treatment treatment, User loggedInUser) {

        boolean result = false;
        if (hasRole(loggedInUser, "SUPER_ADMIN")) {
            System.out.println("Filtering treatment ID: " + treatment.getId());
            System.out.println("Result for SUPER_ADMIN: " + hasRole(loggedInUser, "SUPER_ADMIN"));

            result = true; // Include all treatments for SUPER_ADMIN
        } else if (hasRole(loggedInUser, "DENTIST")) {
            System.out.println("Result for DENTIST: " + (treatment.getPatient().getDoctor().getId().equals(loggedInUser.getId())));

            result = treatment.getPatient().getDoctor().getId().equals(loggedInUser.getId());
        } else if (hasRole(loggedInUser, "ADMIN")){
            System.out.println("Result for ADMIN: " + treatment.getTeam().stream()
                    .anyMatch(member -> member.getResponsible().getId().equals(loggedInUser.getId())));

            result = treatment.getTeam().stream()
                    .anyMatch(member -> member.getResponsible().getId().equals(loggedInUser.getId()));
        }

        return result;
    }

    @Override
    public List<TreatDto> getNotArchivedTreatments(Locale locale, String loggedInUsername) {

        User loggedInUser = userRepository.findByEmail(loggedInUsername)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        List<Enum_Status> statuses = Arrays.asList(
                Enum_Status.CONFIRMED,
                Enum_Status.NEW,
                Enum_Status.COMPLETED,
                Enum_Status.PROGRESS,
                Enum_Status.PRODUCTION,
                Enum_Status.QUALIFIED,
                Enum_Status.DELIVERED
        );

        List<Treatment> treatments = treatmentRepository.findByStatusInOrderByCreatedAtDesc(statuses);


        return treatments.stream()
                .filter(treatment -> filterByUserRole(treatment, loggedInUser))
                .map(treatment -> treatDtoMapper.toDto(treatment, locale))
                .collect(Collectors.toList());
    }
}
*/
