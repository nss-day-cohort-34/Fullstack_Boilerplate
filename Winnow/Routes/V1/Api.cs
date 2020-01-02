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

        public static class Books
        {
            public const string GetAllBooks = Base + "/Books";
            public const string GetBook = Base + "/Books/{id}";
            public const string PostBook = Base + "/Books";
            public const string EditBook = Base + "/Books/{id}";
            public const string DeleteBook = Base + "/Books/{id}";
        }

        public static class User
        {
            public const string Login = Base + "/Auth/Login";
            public const string Register = Base + "/Auth/Register";
            public const string Refresh = Base + "/Auth/Refresh";
        }
    }
}
