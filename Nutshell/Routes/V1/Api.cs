using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Capstone.Routes.V1
{
    public static class Api
    {
        internal const string Root = "api";
        internal const string Version = "v1";
        internal const string Base = Root + "/" + Version;

        public static class References
        {
            public const string GetReferenceTypes = Base + "/ReferenceTypes";
            public const string GetReferences = Base + "/References";
            public const string GetReference = Base + "/References/{id}";
            public const string PutReference = Base + "/References/Edit/{id}";
            public const string PostReference = Base + "/References/Create";
            public const string DeleteReference = Base + "/References/Delete/{id}";
        }
        public static class Songs
        {
            public const string GetSongs = Base + "/Songs";
            public const string GetSong = Base + "/Songs/{id}";
            public const string PutSong = Base + "/Songs/Edit/{id}";
            public const string PostSong = Base + "/Songs/Create";
            public const string DeleteSong = Base + "/Songs/Delete/{id}";
        }
        public static class Words
        {
            public const string GetAllWords = Base + "/Words/All";
            public const string GetWords = Base + "/Words";
            public const string GetDataWords = Base + "/Words/Data";
            public const string GetWord = Base + "/Words/{id}";
            public const string PutWord = Base + "/Words/Edit/{id}";
            public const string PostWord = Base + "/Words/Create";
            public const string PostDataWord = Base + "/Words/CreateData";
            public const string DeleteWord = Base + "/Words/Delete/{id}";
        }
        public static class Titles
        {
            public const string GetTitles = Base + "/Titles";
            public const string GetTitle = Base + "/Titles/{id}";
            public const string PutTitle = Base + "/Titles/Edit/{id}";
            public const string PostTitle = Base + "/Titles/Create";
            public const string DeleteTitle = Base + "/Titles/Delete/{id}";
        }

        public static class User
        {
            public const string Login = Base + "/Auth/Login";
            public const string Register = Base + "/Auth/Register";
            public const string Refresh = Base + "/Auth/Refresh";
        }
    }
}
