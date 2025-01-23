import express from 'express'
import { AchievementsRoute } from '../modules/achievements/achievements.route'
import { AdmissionCircularRoute } from '../modules/admission_circular/admissionCircular.route'
import { AdmissionResultRoute } from '../modules/admission_result/admissionResult.route'
import { LoginRoutes } from '../modules/auth/auth.route'
import { ChairmanMessageRoute } from '../modules/chairman_message/chairmanMessage.route'
import { ClassRoutineRoute } from '../modules/classRoutine/classRoutine.route'
import { ExamRoutineRoute } from '../modules/examRoutine/examRoutine.route'
import { FeaturesRoute } from '../modules/features/features.route'
import { historyRoute } from '../modules/history/history.route'
import { InstituteMottoRoute } from '../modules/institute_motto/InstituteMotto.route'
import { NewsEventsRoute } from '../modules/news-events/newsEvents.route'
import { NoticeRoute } from '../modules/notice/notice.route'
import { photoRoute } from '../modules/photo/photo.route'
import { PrincipalMessageRoute } from '../modules/principal-message/principalMessage.route'
import { InfoRoute } from '../modules/school_info/info.route'
import { SliderRoute } from '../modules/slider/slider.route'
import { SyllabusRoute } from '../modules/syllabus/syllabus.route'
import { TeacherRoute } from '../modules/teachers/teachers.route'
import { userRoutes } from '../modules/user/user.route'
import { VideoRoute } from '../modules/video/video.route'
import { AtAGlanceRoute } from './../modules/at_a_glance/at_a_glance.route'
const router = express.Router()

export const moduleRoutes = [
  {
    path: '/users',
    route: userRoutes,
  },
  {
    path: '/auth',
    route: LoginRoutes,
  },
  {
    path: '/slider',
    route: SliderRoute,
  },
  {
    path: '/info',
    route: InfoRoute,
  },
  {
    path: '/notice',
    route: NoticeRoute,
  },
  {
    path: '/photo',
    route: photoRoute,
  },
  {
    path: '/video',
    route: VideoRoute,
  },
  {
    path: '/chairman-message',
    route: ChairmanMessageRoute,
  },
  {
    path: '/principal-message',
    route: PrincipalMessageRoute,
  },
  {
    path: '/teachers',
    route: TeacherRoute,
  },
  {
    path: '/achievements',
    route: AchievementsRoute,
  },
  {
    path: '/at-a-glance',
    route: AtAGlanceRoute,
  },
  {
    path: '/institute-motto',
    route: InstituteMottoRoute,
  },
  {
    path: '/features',
    route: FeaturesRoute,
  },
  {
    path: '/news-events',
    route: NewsEventsRoute,
  },
  {
    path: '/admission-circular',
    route: AdmissionCircularRoute,
  },
  {
    path: '/admission-result',
    route: AdmissionResultRoute,
  },
  {
    path: '/class-routine',
    route: ClassRoutineRoute,
  },
  {
    path: '/exam-routine',
    route: ExamRoutineRoute,
  },
  {
    path: '/syllabus',
    route: SyllabusRoute,
  },
  {
    path: '/history',
    route: historyRoute,
  },
]
moduleRoutes.forEach(route => router.use(route.path, route.route))
export default router
