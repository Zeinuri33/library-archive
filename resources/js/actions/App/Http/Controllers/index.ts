import DashboardController from './DashboardController'
import SuratController from './SuratController'
import DisposisiController from './DisposisiController'
import ArsipController from './ArsipController'
import AgendaController from './AgendaController'
import KlasifikasiController from './KlasifikasiController'
import UnitPengolahController from './UnitPengolahController'
import TemplateNomorController from './TemplateNomorController'
import UserController from './UserController'
import RoleController from './RoleController'
import PermissionController from './PermissionController'
import Settings from './Settings'

const Controllers = {
    DashboardController: Object.assign(DashboardController, DashboardController),
    SuratController: Object.assign(SuratController, SuratController),
    DisposisiController: Object.assign(DisposisiController, DisposisiController),
    ArsipController: Object.assign(ArsipController, ArsipController),
    AgendaController: Object.assign(AgendaController, AgendaController),
    KlasifikasiController: Object.assign(KlasifikasiController, KlasifikasiController),
    UnitPengolahController: Object.assign(UnitPengolahController, UnitPengolahController),
    TemplateNomorController: Object.assign(TemplateNomorController, TemplateNomorController),
    UserController: Object.assign(UserController, UserController),
    RoleController: Object.assign(RoleController, RoleController),
    PermissionController: Object.assign(PermissionController, PermissionController),
    Settings: Object.assign(Settings, Settings),
}

export default Controllers