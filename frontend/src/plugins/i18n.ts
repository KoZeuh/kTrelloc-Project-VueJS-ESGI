import { createI18n } from 'vue-i18n';
import store from '@/store';

const i18n = createI18n({
    locale: store.state.locale,
    fallbackLocale: 'en',
    legacy: false,
    messages: {
        en: {
            global: {
                add: 'Add',
                save: 'Save',
                remove: 'Remove',
                delete: 'Delete',
                display: 'Display',
                hide: 'Hide',
                or: 'or',
                validate: 'Validate',
                download: 'Download',
                view: 'View',
                archive: 'Archive',
                duplicate: 'Duplicate',

                confirmDeletionTitle: 'Confirm Deletion',

                dialog: {
                    confirm: 'Confirm',
                    cancel: 'Cancel',
                }
            },

            navbar: {
                settings: 'Settings',
                logout: 'Logout',
                home: 'Home',
                dashboard: 'Dashboard',
                getStarted: 'Get Started',

                choiceLanguages: {
                    english: 'English',
                    french: 'French',
                    spanish: 'Spanish',
                    german: 'German',
                    italian: 'Italian',
                    portuguese: 'Portuguese',
                }
            },

            footer: {
                demo: 'Demo',
                support: 'Support',
                privacyPolicy: 'Privacy Policy',
                termsAndConditions: 'Terms and Conditions',
                copyright: {
                    allRightsReserved: 'All rights reserved',
                }
            },

            home: {
                title: 'Learning model of the future',
                subtitle: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque it.',

                firstCard: {
                    title: 'Great Achievements',
                },

                secondCard: {
                    title: 'Graduations Sponsored',
                },
            },

            login: {
                loginToYourAccount: 'Login to your account',
                youMustBeLoggedIn: 'You must be logged in to perform this action',
                continueWith: 'Continue with ',
                resetPassword: 'Reset your password?',
                dontHaveAnAccount: 'Don\'t have an account? ',
                signup: 'Sign up',
            },

            register: {
                title: "Were are the kTrelloc Team",
                pleaseRegisterAnAccount: "Please register an account",
                termsAndConditions: "Terms and Conditions",
                
                company: {
                    title: 'We are the kTrelloc Team',
                    description: 'We are a team of passionate developers working together to create quality web and mobile applications.',
                }
            },

            user: {
                username: 'Username',
                email: 'Email',
                password: 'Password',
                joinAt: 'Join at ',
                emailOrUsername: 'Email or Username',
            },

            settings: {
                title: "Account Settings",
                profileInfos: "Profile Info",
                security: "Security",
                profileInfosDesc: "Update your basic profile information such as Email Address, Name"
            },

            dashboard: {
                createBoard: 'Create a board',
                members: 'Members',
                cards: 'Cards',
                editBoard: {
                    header: 'Edit board',
                    title: 'Title',
                    description: 'Description',
                    visibility: 'Visibility',
                    visibilityOptions: {
                        public: 'Public',
                        private: 'Private',
                        privateInvite: 'Private (Invite only)',
                    },
                },

                deleteBoard: {
                    header: 'Delete board',
                    message: 'Are you sure you want to delete this board?',
                },
            },

            board: {
                backToDashboard: 'Back to dashboard',
                addNewList: 'Add new list',
                addNewMember: 'Add new member',
                membersList: 'Members list',
                myOtherBoards: 'My other boards',
                addMember: 'Add member',
                confirmMessageRemoveList: 'Are you sure you want to delete this list?',
                rolesOptions: {
                    admin: 'Admin',
                    member: 'Member',
                }
            },

            errors: {
                error_404: {
                    title: 'Looks like you\'ve found the doorway to the great nothing',
                    paragraph_1: 'The content you’re looking for doesn’t exist. Either it was removed, or you mistyped the link.',
                    paragraph_2: 'Sorry about that! Please visit our hompage to get where you need to go.',
                    backToHome: 'Go to homepage',
                },

                error_alert: {
                    title: 'An error occurred',
                }
            },

            modals: {
                addMember: {
                    title: 'Add a member'
                },

                boardMembersList: {
                    title: 'Board members list',
                    removeMember: 'Remove',
                    confirmMessageRemoveMember: 'Are you sure you want to remove this member from the board?'
                },

                cardDetails: {
                    addDescription: 'Add a description',
                    checkedTasks: 'Checked tasks',
                    history: 'History',
                    showHistory: 'Show history',
                    addNewItem: 'Add a new element',
                    tags: 'Tags',
                    addToCard: 'Add to card',
                    uploadDescription: 'Click to upload or drag and drop',
                    uploadTitle: 'Upload',
                    confirmMessageRemoveChecklistItem: 'Are you sure you want to delete this item?',
                    confirmMessageRemoveAttachment: 'Are you sure you want to delete this attachment?',
                    confirmMessageRemoveCard: 'Are you sure you want to delete this card?',
                    confirmMessageRemoveChecklist: 'Are you sure you want to delete this checklist?',
                    removeMemberFromCard: 'Remove member',
                }
            }
        },

        fr: {
            global: {
                add: 'Ajouter',
                save: 'Enregistrer',
                remove: 'Supprimer',
                delete: 'Supprimer',
                display: 'Afficher',
                hide: 'Cacher',
                or: 'ou',
                validate: 'Valider',
                download: 'Télécharger',
                view: 'Voir',
                archive: 'Archiver',
                duplicate: 'Dupliquer',

                confirmDeletionTitle: 'Confirmer la suppression',

                dialog: {
                    confirm: 'Confirmer',
                    cancel: 'Annuler',
                }
            },

            navbar: {
                settings: 'Paramètres',
                logout: 'Déconnexion',
                home: 'Accueil',
                dashboard: 'Tableau de bord',
                getStarted: 'Commencer',

                choiceLanguages: {
                    english: 'Anglais',
                    french: 'Français',
                    spanish: 'Espagnol',
                    german: 'Allemand',
                    italian: 'Italien',
                    portuguese: 'Portugais',
                }
            },

            footer: {
                demo: 'Démo',
                support: 'Support',
                privacyPolicy: 'Politique de confidentialité',
                termsAndConditions: 'Conditions d\'utilisation',
                copyright: {
                    allRightsReserved: 'Tous droits réservés',
                }
            },

            home: {
                title: 'Modèle d\'apprentissage du futur',
                subtitle: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque it.',

                firstCard: {
                    title: 'Grands accomplissements',
                },

                secondCard: {
                    title: 'Diplômes parrainés',
                },
            },

            login: {
                loginToYourAccount: 'Connectez-vous à votre compte',
                youMustBeLoggedIn: 'Vous devez être connecté pour effectuer cette action',
                continueWith: 'Continuer avec ',
                resetPassword: 'Réinitialiser votre mot de passe?',
                dontHaveAnAccount: 'Vous n\'avez pas de compte? ',
                signup: 'S\'inscrire',
            },

            register: {
                title: "Nous sommes l'équipe kTrelloc",
                pleaseRegisterAnAccount: "Veuillez créer un compte",
                termsAndConditions: "Conditions d'utilisation",
                
                company: {
                    title: 'Nous sommes l\'équipe kTrelloc',
                    description: 'Nous sommes une équipe de développeurs passionnés qui travaillent ensemble pour créer des applications web et mobiles de qualité.',
                }
            },

            user: {
                username: 'Nom d\'utilisateur',
                email: 'Email',
                password: 'Mot de passe',
                joinAt: 'Rejoint le ',
                emailOrUsername: 'Email ou Nom d\'utilisateur',
            },

            settings: {
                title: "Paramètres du compte",
                profileInfos: "Informations de profil",
                security: "Sécurité",
                profileInfosDesc: "Mettre à jour vos informations de profil de base telles que l'adresse e-mail, le nom"
            },

            dashboard: {
                createBoard: 'Créer un tableau',
                members: 'Membres',
                cards: 'Cartes',
                editBoard: {
                    header: 'Modifier le tableau',
                    title: 'Titre',
                    description: 'Description',
                    visibility: 'Visibilité',
                    visibilityOptions: {
                        public: 'Public',
                        private: 'Privé',
                        privateInvite: 'Privé (Invitation seulement)',
                    },
                },

                deleteBoard: {
                    header: 'Supprimer le tableau',
                    message: 'Êtes-vous sûr de vouloir supprimer ce tableau?',
                },
            },

            board: {
                backToDashboard: 'Retour au tableau de bord',
                addNewList: 'Ajouter une nouvelle liste',
                addNewMember: 'Ajouter un nouveau membre',
                membersList: 'Liste des membres',
                myOtherBoards: 'Mes autres tableaux',
                addMember: 'Ajouter un membre',
                rolesOptions: {
                    admin: 'Admin',
                    member: 'Membre',
                }
            },

            errors: {
                error_404: {
                    title: 'On dirait que vous avez trouvé la porte du grand rien',
                    paragraph_1: 'Le contenu que vous recherchez n\'existe pas. Soit il a été supprimé, soit vous avez mal tapé le lien.',
                    paragraph_2: 'Désolé pour ça! Veuillez visiter notre page d\'accueil pour vous rendre où vous devez aller.',
                    backToHome: 'Aller à la page d\'accueil',
                },

                error_alert: {
                    title: 'Une erreur est survenue',
                }
            },

            modals: {
                addMember: {
                    title: 'Ajouter un membre'
                },

                boardMembersList: {
                    title: 'Liste des membres du tableau',
                    removeMember: 'Supprimer',
                    confirmMessageRemoveMember: 'Êtes-vous sûr de vouloir supprimer ce membre du tableau?'
                },

                cardDetails: {
                    addDescription: 'Ajouter une description',
                    checkedTasks: 'Tâches cochées',
                    history: 'Historique',
                    addNewItem: 'Ajouter un nouvel élément',
                    tags: 'Tags',
                    addToCard: 'Ajouter à la carte',
                    uploadDescription: 'Cliquer ou glisser-déposer',
                    uploadTitle: 'Télécharger',
                    confirmMessageRemoveChecklistItem: 'Êtes-vous sûr de vouloir supprimer cet élément?',
                    confirmMessageRemoveAttachment: 'Êtes-vous sûr de vouloir supprimer cette pièce jointe?',
                    confirmMessageRemoveCard: 'Êtes-vous sûr de vouloir supprimer cette carte?',
                    confirmMessageRemoveChecklist: 'Êtes-vous sûr de vouloir supprimer cette liste de contrôle?',
                    removeMemberFromCard: 'Retirer de la carte',
                }
            }
        },

        es: {
            global: {
                add: 'Añadir',
                save: 'Guardar',
                remove: 'Eliminar',
                delete: 'Borrar',
                display: 'Mostrar',
                hide: 'Ocultar',
                or: 'o',
                validate: 'Validar',
                download: 'Descargar',
                view: 'Ver',
                archive: 'Archivar',
                duplicate: 'Duplicar',
        
                confirmDeletionTitle: 'Confirmar eliminación',
        
                dialog: {
                    confirm: 'Confirmar',
                    cancel: 'Cancelar',
                }
            },
        
            navbar: {
                settings: 'Configuración',
                logout: 'Cerrar sesión',
                home: 'Inicio',
                dashboard: 'Tablero',
                getStarted: 'Comenzar',
        
                choiceLanguages: {
                    english: 'Inglés',
                    french: 'Francés',
                    spanish: 'Español',
                    german: 'Alemán',
                    italian: 'Italiano',
                    portuguese: 'Portugués',
                }
            },
        
            footer: {
                demo: 'Demostración',
                support: 'Soporte',
                privacyPolicy: 'Política de privacidad',
                termsAndConditions: 'Términos y condiciones',
                copyright: {
                    allRightsReserved: 'Todos los derechos reservados',
                }
            },
        
            home: {
                title: 'Modelo de aprendizaje del futuro',
                subtitle: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque it.',
        
                firstCard: {
                    title: 'Grandes Logros',
                },
        
                secondCard: {
                    title: 'Graduaciones Patrocinadas',
                },
            },
        
            login: {
                loginToYourAccount: 'Inicia sesión en tu cuenta',
                youMustBeLoggedIn: 'Debes estar conectado para realizar esta acción',
                continueWith: 'Continuar con ',
                resetPassword: '¿Restablecer tu contraseña?',
                dontHaveAnAccount: '¿No tienes una cuenta? ',
                signup: 'Regístrate',
            },
        
            register: {
                title: "Somos el equipo de kTrelloc",
                pleaseRegisterAnAccount: "Por favor, regístrate",
                termsAndConditions: "Términos y condiciones",
                
                company: {
                    title: 'Somos el equipo de kTrelloc',
                    description: 'Somos un equipo de desarrolladores apasionados que trabajan juntos para crear aplicaciones web y móviles de calidad.',
                }
            },
        
            user: {
                username: 'Nombre de usuario',
                email: 'Correo electrónico',
                password: 'Contraseña',
                joinAt: 'Unirse en ',
                emailOrUsername: 'Correo electrónico o nombre de usuario',
            },
        
            settings: {
                title: "Configuración de la cuenta",
                profileInfos: "Información del perfil",
                security: "Seguridad",
                profileInfosDesc: "Actualiza tu información básica de perfil como la dirección de correo electrónico y el nombre",
            },
        
            dashboard: {
                createBoard: 'Crear un tablero',
                members: 'Miembros',
                cards: 'Tarjetas',
                editBoard: {
                    header: 'Editar tablero',
                    title: 'Título',
                    description: 'Descripción',
                    visibility: 'Visibilidad',
                    visibilityOptions: {
                        public: 'Público',
                        private: 'Privado',
                        privateInvite: 'Privado (solo por invitación)',
                    },
                },
        
                deleteBoard: {
                    header: 'Eliminar tablero',
                    message: '¿Estás seguro de que quieres eliminar este tablero?',
                },
            },
        
            board: {
                backToDashboard: 'Volver al tablero',
                addNewList: 'Añadir nueva lista',
                addNewMember: 'Añadir nuevo miembro',
                membersList: 'Lista de miembros',
                myOtherBoards: 'Mis otros tableros',
                addMember: 'Añadir miembro',
                confirmMessageRemoveList: '¿Estás seguro de que quieres eliminar esta lista?',
                rolesOptions: {
                    admin: 'Admin',
                    member: 'Miembro',
                }
            },
        
            errors: {
                error_404: {
                    title: 'Parece que has encontrado la puerta a la gran nada',
                    paragraph_1: 'El contenido que buscas no existe. O fue eliminado o escribiste mal el enlace.',
                    paragraph_2: '¡Lo siento! Visita nuestra página de inicio para llegar a donde necesitas ir.',
                    backToHome: 'Ir a la página de inicio',
                },
        
                error_alert: {
                    title: 'Ha ocurrido un error',
                }
            },
        
            modals: {
                addMember: {
                    title: 'Añadir un miembro'
                },
        
                boardMembersList: {
                    title: 'Lista de miembros del tablero',
                    removeMember: 'Eliminar',
                    confirmMessageRemoveMember: '¿Estás seguro de que quieres eliminar a este miembro del tablero?'
                },
        
                cardDetails: {
                    addDescription: 'Añadir una descripción',
                    checkedTasks: 'Tareas marcadas',
                    history: 'Historial',
                    addNewItem: 'Añadir un nuevo elemento',
                    tags: 'Etiquetas',
                    addToCard: 'Añadir a la tarjeta',
                    uploadDescription: 'Haz clic para subir o arrastra y suelta',
                    uploadTitle: 'Subir',
                    confirmMessageRemoveChecklistItem: '¿Estás seguro de que quieres eliminar este elemento?',
                    confirmMessageRemoveAttachment: '¿Estás seguro de que quieres eliminar este archivo adjunto?',
                    confirmMessageRemoveCard: '¿Estás seguro de que quieres eliminar esta tarjeta?',
                    confirmMessageRemoveChecklist: '¿Estás seguro de que quieres eliminar esta lista de verificación?',
                    removeMemberFromCard: 'Eliminar miembro',
                }
            }
        },

        de: {
            global: {
                add: 'Hinzufügen',
                save: 'Speichern',
                remove: 'Entfernen',
                delete: 'Löschen',
                display: 'Anzeigen',
                hide: 'Verstecken',
                or: 'oder',
                validate: 'Validieren',
                download: 'Herunterladen',
                view: 'Ansehen',
                archive: 'Archivieren',
                duplicate: 'Duplizieren',
        
                confirmDeletionTitle: 'Löschung bestätigen',
        
                dialog: {
                    confirm: 'Bestätigen',
                    cancel: 'Abbrechen',
                }
            },
        
            navbar: {
                settings: 'Einstellungen',
                logout: 'Abmelden',
                home: 'Startseite',
                dashboard: 'Dashboard',
                getStarted: 'Loslegen',
        
                choiceLanguages: {
                    english: 'Englisch',
                    french: 'Französisch',
                    spanish: 'Spanisch',
                    german: 'Deutsch',
                    italian: 'Italienisch',
                    portuguese: 'Portugiesisch',
                }
            },
        
            footer: {
                demo: 'Demo',
                support: 'Unterstützung',
                privacyPolicy: 'Datenschutzrichtlinie',
                termsAndConditions: 'Allgemeine Geschäftsbedingungen',
                copyright: {
                    allRightsReserved: 'Alle Rechte vorbehalten',
                }
            },
        
            home: {
                title: 'Lernmodell der Zukunft',
                subtitle: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque it.',
        
                firstCard: {
                    title: 'Große Erfolge',
                },
        
                secondCard: {
                    title: 'Gesponserte Abschlüsse',
                },
            },
        
            login: {
                loginToYourAccount: 'Melden Sie sich bei Ihrem Konto an',
                youMustBeLoggedIn: 'Sie müssen angemeldet sein, um diese Aktion durchzuführen',
                continueWith: 'Weiter mit ',
                resetPassword: 'Passwort zurücksetzen?',
                dontHaveAnAccount: 'Sie haben kein Konto? ',
                signup: 'Anmelden',
            },
        
            register: {
                title: "Wir sind das kTrelloc-Team",
                pleaseRegisterAnAccount: "Bitte registrieren Sie ein Konto",
                termsAndConditions: "Allgemeine Geschäftsbedingungen",
                
                company: {
                    title: 'Wir sind das kTrelloc-Team',
                    description: 'Wir sind ein Team von leidenschaftlichen Entwicklern, die gemeinsam hochwertige Web- und Mobile-Anwendungen erstellen.',
                }
            },
        
            user: {
                username: 'Benutzername',
                email: 'E-Mail',
                password: 'Passwort',
                joinAt: 'Beitreten am ',
                emailOrUsername: 'E-Mail oder Benutzername',
            },
        
            settings: {
                title: "Kontoeinstellungen",
                profileInfos: "Profilinformationen",
                security: "Sicherheit",
                profileInfosDesc: "Aktualisieren Sie Ihre grundlegenden Profilinformationen wie E-Mail-Adresse und Name",
            },
        
            dashboard: {
                createBoard: 'Ein Board erstellen',
                members: 'Mitglieder',
                cards: 'Karten',
                editBoard: {
                    header: 'Board bearbeiten',
                    title: 'Titel',
                    description: 'Beschreibung',
                    visibility: 'Sichtbarkeit',
                    visibilityOptions: {
                        public: 'Öffentlich',
                        private: 'Privat',
                        privateInvite: 'Privat (nur auf Einladung)',
                    },
                },
        
                deleteBoard: {
                    header: 'Board löschen',
                    message: 'Sind Sie sicher, dass Sie dieses Board löschen möchten?',
                },
            },
        
            board: {
                backToDashboard: 'Zurück zum Dashboard',
                addNewList: 'Neue Liste hinzufügen',
                addNewMember: 'Neues Mitglied hinzufügen',
                membersList: 'Mitgliederliste',
                myOtherBoards: 'Meine anderen Boards',
                addMember: 'Mitglied hinzufügen',
                confirmMessageRemoveList: 'Sind Sie sicher, dass Sie diese Liste löschen möchten?',
                rolesOptions: {
                    member: 'Mitgli',
                    admin: 'Administrator',
                }
            },
        
            errors: {
                error_404: {
                    title: 'Es scheint, als hätten Sie das Tor zum großen Nichts gefunden',
                    paragraph_1: 'Der Inhalt, den Sie suchen, existiert nicht. Entweder wurde er entfernt oder Sie haben den Link falsch eingegeben.',
                    paragraph_2: 'Entschuldigung! Bitte besuchen Sie unsere Startseite, um dorthin zu gelangen, wo Sie hin müssen.',
                    backToHome: 'Zur Startseite gehen',
                },
        
                error_alert: {
                    title: 'Ein Fehler ist aufgetreten',
                }
            },
        
            modals: {
                addMember: {
                    title: 'Ein Mitglied hinzufügen'
                },
        
                boardMembersList: {
                    title: 'Mitgliederliste des Boards',
                    removeMember: 'Entfernen',
                    confirmMessageRemoveMember: 'Sind Sie sicher, dass Sie dieses Mitglied aus dem Board entfernen möchten?'
                },
        
                cardDetails: {
                    addDescription: 'Eine Beschreibung hinzufügen',
                    checkedTasks: 'Geprüfte Aufgaben',
                    history: 'Verlauf',
                    addNewItem: 'Neues Element hinzufügen',
                    tags: 'Tags',
                    addToCard: 'Zur Karte hinzufügen',
                    uploadDescription: 'Klicken zum Hochladen oder ziehen und ablegen',
                    uploadTitle: 'Hochladen',
                    confirmMessageRemoveChecklistItem: 'Sind Sie sicher, dass Sie dieses Element löschen möchten?',
                    confirmMessageRemoveAttachment: 'Sind Sie sicher, dass Sie diesen Anhang löschen möchten?',
                    confirmMessageRemoveCard: 'Sind Sie sicher, dass Sie diese Karte löschen möchten?',
                    confirmMessageRemoveChecklist: 'Sind Sie sicher, dass Sie diese Checkliste löschen möchten?',
                    removeMemberFromCard: 'Mitglied entfernen',
                }
            }
        },
        
        it: {
            global: {
                add: 'Aggiungere',
                save: 'Salvare',
                remove: 'Rimuovere',
                delete: 'Eliminare',
                display: 'Visualizzare',
                hide: 'Nascondere',
                or: 'o',
                validate: 'Validare',
                download: 'Scaricare',
                view: 'Vedere',
                archive: 'Archiviare',
                duplicate: 'Duplicare',
        
                confirmDeletionTitle: 'Confermare l\'eliminazione',
        
                dialog: {
                    confirm: 'Confermare',
                    cancel: 'Annullare',
                }
            },
        
            navbar: {
                settings: 'Impostazioni',
                logout: 'Disconnettersi',
                home: 'Home',
                dashboard: 'Dashboard',
                getStarted: 'Inizia',
        
                choiceLanguages: {
                    english: 'Inglese',
                    french: 'Francese',
                    spanish: 'Spagnolo',
                    german: 'Tedesco',
                    italian: 'Italiano',
                    portuguese: 'Portoghese',
                }
            },
        
            footer: {
                demo: 'Demo',
                support: 'Supporto',
                privacyPolicy: 'Politica sulla privacy',
                termsAndConditions: 'Termini e condizioni',
                copyright: {
                    allRightsReserved: 'Tutti i diritti riservati',
                }
            },
        
            home: {
                title: 'Modello di apprendimento del futuro',
                subtitle: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque it.',
        
                firstCard: {
                    title: 'Grandi Successi',
                },
        
                secondCard: {
                    title: 'Lauree sponsorizzate',
                },
            },
        
            login: {
                loginToYourAccount: 'Accedi al tuo account',
                youMustBeLoggedIn: 'Devi essere connesso per eseguire questa azione',
                continueWith: 'Continua con ',
                resetPassword: 'Reimposta la password?',
                dontHaveAnAccount: 'Non hai un account? ',
                signup: 'Iscriviti',
            },
        
            register: {
                title: "Siamo il team di kTrelloc",
                pleaseRegisterAnAccount: "Si prega di registrare un account",
                termsAndConditions: "Termini e condizioni",
                
                company: {
                    title: 'Siamo il team di kTrelloc',
                    description: 'Siamo un team di sviluppatori appassionati che lavorano insieme per creare applicazioni web e mobile di qualità.',
                }
            },
        
            user: {
                username: 'Nome utente',
                email: 'Email',
                password: 'Password',
                joinAt: 'Unito a ',
                emailOrUsername: 'Email o nome utente',
            },
        
            settings: {
                title: "Impostazioni account",
                profileInfos: "Informazioni profilo",
                security: "Sicurezza",
                profileInfosDesc: "Aggiorna le tue informazioni di base come indirizzo email e nome",
            },
        
            dashboard: {
                createBoard: 'Crea una bacheca',
                members: 'Membri',
                cards: 'Carte',
                editBoard: {
                    header: 'Modifica bacheca',
                    title: 'Titolo',
                    description: 'Descrizione',
                    visibility: 'Visibilità',
                    visibilityOptions: {
                        public: 'Pubblico',
                        private: 'Privato',
                        privateInvite: 'Privato (solo su invito)',
                    },
                },
        
                deleteBoard: {
                    header: 'Elimina bacheca',
                    message: 'Sei sicuro di voler eliminare questa bacheca?',
                },
            },
        
            board: {
                backToDashboard: 'Torna al dashboard',
                addNewList: 'Aggiungi nuova lista',
                addNewMember: 'Aggiungi nuovo membro',
                membersList: 'Elenco membri',
                myOtherBoards: 'Le mie altre bacheche',
                addMember: 'Aggiungi membro',
                confirmMessageRemoveList: 'Sei sicuro di voler eliminare questa lista?',
                rolesOptions: {
                    admin: 'Admin',
                    member: 'Membro',
                }
            },
        
            errors: {
                error_404: {
                    title: 'Sembra che tu abbia trovato la porta del grande nulla',
                    paragraph_1: 'Il contenuto che stai cercando non esiste. O è stato rimosso, o hai digitato male il link.',
                    paragraph_2: 'Mi dispiace! Visita la nostra homepage per andare dove devi andare.',
                    backToHome: 'Vai alla homepage',
                },
        
                error_alert: {
                    title: 'Si è verificato un errore',
                }
            },
        
            modals: {
                addMember: {
                    title: 'Aggiungi un membro'
                },
        
                boardMembersList: {
                    title: 'Elenco membri della bacheca',
                    removeMember: 'Rimuovere',
                    confirmMessageRemoveMember: 'Sei sicuro di voler rimuovere questo membro dalla bacheca?'
                },
        
                cardDetails: {
                    addDescription: 'Aggiungi una descrizione',
                    checkedTasks: 'Attività completate',
                    history: 'Cronologia',
                    addNewItem: 'Aggiungi un nuovo elemento',
                    tags: 'Tag',
                    addToCard: 'Aggiungi alla carta',
                    uploadDescription: 'Clicca per caricare o trascina e rilascia',
                    uploadTitle: 'Carica',
                    confirmMessageRemoveChecklistItem: 'Sei sicuro di voler eliminare questo elemento?',
                    confirmMessageRemoveAttachment: 'Sei sicuro di voler eliminare questo allegato?',
                    confirmMessageRemoveCard: 'Sei sicuro di voler eliminare questa carta?',
                    confirmMessageRemoveChecklist: 'Sei sicuro di voler eliminare questa checklist?',
                    removeMemberFromCard: 'Rimuovi membro',
                }
            }
        },

        pt: {
            global: {
                add: 'Adicionar',
                save: 'Salvar',
                remove: 'Remover',
                delete: 'Excluir',
                display: 'Exibir',
                hide: 'Ocultar',
                or: 'ou',
                validate: 'Validar',
                download: 'Baixar',
                view: 'Ver',
                archive: 'Arquivar',
                duplicate: 'Duplicar',
        
                confirmDeletionTitle: 'Confirmar exclusão',
        
                dialog: {
                    confirm: 'Confirmar',
                    cancel: 'Cancelar',
                }
            },
        
            navbar: {
                settings: 'Configurações',
                logout: 'Sair',
                home: 'Início',
                dashboard: 'Painel',
                getStarted: 'Começar',
        
                choiceLanguages: {
                    english: 'Inglês',
                    french: 'Francês',
                    spanish: 'Espanhol',
                    german: 'Alemão',
                    italian: 'Italiano',
                    portuguese: 'Português',
                }
            },
        
            footer: {
                demo: 'Demonstração',
                support: 'Suporte',
                privacyPolicy: 'Política de Privacidade',
                termsAndConditions: 'Termos e Condições',
                copyright: {
                    allRightsReserved: 'Todos os direitos reservados',
                }
            },
        
            home: {
                title: 'Modelo de aprendizado do futuro',
                subtitle: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque it.',
        
                firstCard: {
                    title: 'Grandes Conquistas',
                },
        
                secondCard: {
                    title: 'Graduações Patrocinadas',
                },
            },
        
            login: {
                loginToYourAccount: 'Faça login na sua conta',
                youMustBeLoggedIn: 'Você deve estar logado para realizar esta ação',
                continueWith: 'Continuar com ',
                resetPassword: 'Redefinir sua senha?',
                dontHaveAnAccount: 'Não tem uma conta? ',
                signup: 'Inscreva-se',
            },
        
            register: {
                title: "Somos a equipe kTrelloc",
                pleaseRegisterAnAccount: "Por favor, registre uma conta",
                termsAndConditions: "Termos e Condições",
                
                company: {
                    title: 'Somos a equipe kTrelloc',
                    description: 'Somos uma equipe de desenvolvedores apaixonados que trabalham juntos para criar aplicações web e móveis de qualidade.',
                }
            },
        
            user: {
                username: 'Nome de usuário',
                email: 'Email',
                password: 'Senha',
                joinAt: 'Entrou em ',
                emailOrUsername: 'Email ou nome de usuário',
            },
        
            settings: {
                title: "Configurações da conta",
                profileInfos: "Informações do perfil",
                security: "Segurança",
                profileInfosDesc: "Atualize suas informações básicas de perfil, como endereço de e-mail e nome",
            },
        
            dashboard: {
                createBoard: 'Criar um quadro',
                members: 'Membros',
                cards: 'Cartões',
                editBoard: {
                    header: 'Editar quadro',
                    title: 'Título',
                    description: 'Descrição',
                    visibility: 'Visibilidade',
                    visibilityOptions: {
                        public: 'Público',
                        private: 'Privado',
                        privateInvite: 'Privado (somente por convite)',
                    },
                },
        
                deleteBoard: {
                    header: 'Excluir quadro',
                    message: 'Tem certeza de que deseja excluir este quadro?',
                },
            },
        
            board: {
                backToDashboard: 'Voltar ao painel',
                addNewList: 'Adicionar nova lista',
                addNewMember: 'Adicionar novo membro',
                membersList: 'Lista de membros',
                myOtherBoards: 'Meus outros quadros',
                addMember: 'Adicionar membro',
                confirmMessageRemoveList: 'Tem certeza de que deseja excluir esta lista?',
                rolesOptions: {
                    admin: 'Admin',
                    member: 'Membro',
                }
            },
        
            errors: {
                error_404: {
                    title: 'Parece que você encontrou a porta para o grande nada',
                    paragraph_1: 'O conteúdo que você está procurando não existe. Ou foi removido, ou você digitou o link errado.',
                    paragraph_2: 'Desculpe por isso! Visite nossa página inicial para ir onde você precisa.',
                    backToHome: 'Ir para a página inicial',
                },
        
                error_alert: {
                    title: 'Ocorreu um erro',
                }
            },
        
            modals: {
                addMember: {
                    title: 'Adicionar um membro'
                },
        
                boardMembersList: {
                    title: 'Lista de membros do quadro',
                    removeMember: 'Remover',
                    confirmMessageRemoveMember: 'Tem certeza de que deseja remover este membro do quadro?'
                },
        
                cardDetails: {
                    addDescription: 'Adicionar uma descrição',
                    checkedTasks: 'Tarefas marcadas',
                    history: 'Histórico',
                    addNewItem: 'Adicionar um novo item',
                    tags: 'Tags',
                    addToCard: 'Adicionar ao cartão',
                    uploadDescription: 'Clique para fazer upload ou arraste e solte',
                    uploadTitle: 'Carregar',
                    confirmMessageRemoveChecklistItem: 'Tem certeza de que deseja excluir este item?',
                    confirmMessageRemoveAttachment: 'Tem certeza de que deseja excluir este anexo?',
                    confirmMessageRemoveCard: 'Tem certeza de que deseja excluir este cartão?',
                    confirmMessageRemoveChecklist: 'Tem certeza de que deseja excluir esta lista de verificação?',
                    removeMemberFromCard: 'Remover membro',
                }
            }
        }        
    }
})

export default i18n;