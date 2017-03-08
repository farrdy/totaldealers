(function () {
    angular.module("dealerApp").controller("EditStandingDryLogCtrl", function ($scope, ShareData, StandingDryLogService) {
        getIssueLog();
        function getIssueLog() {
            var promiseGetIssueLog = StandingDryLogService.getStandingDryLog(ShareData.value);
               promiseGetIssueLog.then(function (pl) {            
                $scope.IDInstance = p1.IDInstance;
                $scope.DealerName = p1.DealerName;
                $scope.Email = p1.Email;
                $scope.Name = p1.Name;
                $scope.PODReference = p1.PODReference;
                $scope.IDSOC = p1.IDSOC;
                $scope.SOCName = p1.SOCName;
                $scope.Claim = p1.Claim;
                $scope.ClaimComment = p1.ClaimComment;
                $scope.Volume = p1.Volume;
                $scope.IDIssueType = p1.IDIssueType;
                $scope.IssueTypeName = p1.IssueTypeName;
                $scope.Duration = p1.Duration;
                $scope.Comment = p1.Comment;
                $scope.ATGOperational = p1.ATGOperational;
                $scope.ATGCommFail = p1.ATGCommFail;
                $scope.UserId = p1.UserId;
                $scope.OutletNo = p1.OutletNo;
                $scope.DealerUser = p1.DealerUser;
                $scope.IDProduct = p1.IDProduct;
                $scope.ProductName = p1.ProductName;
                $scope.IDTank = p1.IDTank;
                $scope.TankName = p1.TankName;
                $scope.DateDryFrom = p1.DateDryFrom;
                $scope.DateDryTo = p1.DateDryTo;
                $scope.DateLogged = p1.DateLogged;
                $scope.DateClosed = p1.DateClosed;
                $scope.IDRequestStatus = p1.IDRequestStatus;
                $scope.RequestStatusName = p1.RequestStatusName;
                $scope.Adding = p1.Adding;
            },
                  function (errorPl) {
                      $scope.error = 'failure loading Issue', errorPl;
                  });
        }
        //$scope.save = function () {
        //    var Student = {
        //        StudentID: $scope.Student.studentID,
        //        Name: $scope.Student.name,
        //        Email: $scope.Student.email,
        //        Class: $scope.Student.class,
        //        EnrollYear: $scope.Student.enrollYear,
        //        City: $scope.Student.city,
        //        Country: $scope.Student.country
        //    };

        //    var promisePutStudent = SPACRUDService.put($scope.Student.studentID, Student);
        //    promisePutStudent.then(function (pl) {
        //        $location.path("/showstudents");
        //    },
        //          function (errorPl) {
        //              $scope.error = 'failure loading Student', errorPl;
        //          });
        //};

    });
}());