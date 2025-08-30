import { TestBed } from '@angular/core/testing';
import { UsersStoreService } from './usersStore.service';
import { UserDto } from '@/data/dtos/users/users.response.dto';

fdescribe('UsersStoreService', () => {
  let service: UsersStoreService;

  const mockUser: UserDto = {
    id: 1,
    name: 'John Doe',
    username: 'johndoe',
    email: 'john@example.com',
    phone: '123-456-7890',
  };

  const mockUsers: UserDto[] = [
    {
      id: 1,
      name: 'John Doe',
      username: 'johndoe',
      email: 'john@example.com',
      phone: '123-456-7890',
    },
    {
      id: 2,
      name: 'Jane Smith',
      username: 'janesmith',
      email: 'jane@example.com',
      phone: '098-765-4321',
    },
    {
      id: 3,
      name: 'Bob Johnson',
      username: 'bobjohnson',
      email: 'bob@example.com',
      phone: '555-123-4567',
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsersStoreService],
    });
    service = TestBed.inject(UsersStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('users getter', () => {
    it('should return empty array initially', () => {
      expect(service.users).toEqual([]);
    });

    it('should return users after setting them', () => {
      service.setUsers(mockUsers);
      expect(service.users).toEqual(mockUsers);
    });

    it('should return updated users after multiple set operations', () => {
      service.setUsers(mockUsers);
      const newUsers: UserDto[] = [
        {
          id: 4,
          name: 'Alice Brown',
          username: 'alicebrown',
          email: 'alice@example.com',
          phone: '111-222-3333',
        },
      ];
      service.setUsers(newUsers);
      expect(service.users).toEqual(newUsers);
      expect(service.users.length).toBe(1);
    });
  });

  describe('totalUsers getter', () => {
    it('should return empty array initially', () => {
      expect(service.totalUsers).toEqual([]);
    });

    it('should return total users after setting them', () => {
      service.setTotalUsers(mockUsers);
      expect(service.totalUsers).toEqual(mockUsers);
    });

    it('should return updated total users after multiple set operations', () => {
      service.setTotalUsers(mockUsers);
      const newTotalUsers: UserDto[] = [
        {
          id: 5,
          name: 'Charlie Wilson',
          username: 'charliewilson',
          email: 'charlie@example.com',
          phone: '444-555-6666',
        },
      ];
      service.setTotalUsers(newTotalUsers);
      expect(service.totalUsers).toEqual(newTotalUsers);
      expect(service.totalUsers.length).toBe(1);
    });
  });

  describe('setUsers', () => {
    it('should set users array', () => {
      service.setUsers(mockUsers);
      expect(service.users).toEqual(mockUsers);
    });

    it('should replace existing users', () => {
      service.setUsers(mockUsers);
      const newUsers: UserDto[] = [
        {
          id: 6,
          name: 'David Lee',
          username: 'davidlee',
          email: 'david@example.com',
          phone: '777-888-9999',
        },
      ];

      service.setUsers(newUsers);
      expect(service.users).toEqual(newUsers);
      expect(service.users.length).toBe(1);
    });

    it('should set empty array', () => {
      service.setUsers(mockUsers);
      service.setUsers([]);
      expect(service.users).toEqual([]);
    });

    it('should handle single user', () => {
      service.setUsers([mockUser]);
      expect(service.users).toEqual([mockUser]);
      expect(service.users.length).toBe(1);
    });
  });

  describe('setTotalUsers', () => {
    it('should set total users array', () => {
      service.setTotalUsers(mockUsers);
      expect(service.totalUsers).toEqual(mockUsers);
    });

    it('should replace existing total users', () => {
      service.setTotalUsers(mockUsers);
      const newTotalUsers: UserDto[] = [
        {
          id: 7,
          name: 'Eva Garcia',
          username: 'evagarcia',
          email: 'eva@example.com',
          phone: '000-111-2222',
        },
      ];

      service.setTotalUsers(newTotalUsers);
      expect(service.totalUsers).toEqual(newTotalUsers);
      expect(service.totalUsers.length).toBe(1);
    });

    it('should set empty array for total users', () => {
      service.setTotalUsers(mockUsers);
      service.setTotalUsers([]);
      expect(service.totalUsers).toEqual([]);
    });

    it('should handle single total user', () => {
      service.setTotalUsers([mockUser]);
      expect(service.totalUsers).toEqual([mockUser]);
      expect(service.totalUsers.length).toBe(1);
    });
  });

  describe('signal reactivity', () => {
    it('should maintain separate state for users and totalUsers', () => {
      service.setUsers(mockUsers);
      service.setTotalUsers([mockUser]);

      expect(service.users).toEqual(mockUsers);
      expect(service.totalUsers).toEqual([mockUser]);
      expect(service.users).not.toEqual(service.totalUsers);
    });

    it('should not affect totalUsers when setting users', () => {
      service.setTotalUsers(mockUsers);
      service.setUsers([mockUser]);

      expect(service.users).toEqual([mockUser]);
      expect(service.totalUsers).toEqual(mockUsers);
    });

    it('should not affect users when setting totalUsers', () => {
      service.setUsers(mockUsers);
      service.setTotalUsers([mockUser]);

      expect(service.users).toEqual(mockUsers);
      expect(service.totalUsers).toEqual([mockUser]);
    });
  });

  describe('data integrity', () => {
    it('should preserve user data structure', () => {
      const complexUser: UserDto = {
        id: 999,
        name: 'Complex User',
        username: 'complexuser',
        email: 'complex@example.com',
        phone: '999-999-9999',
      };

      service.setUsers([complexUser]);
      const retrievedUser = service.users[0];

      expect(retrievedUser.id).toBe(complexUser.id);
      expect(retrievedUser.name).toBe(complexUser.name);
      expect(retrievedUser.username).toBe(complexUser.username);
      expect(retrievedUser.email).toBe(complexUser.email);
      expect(retrievedUser.phone).toBe(complexUser.phone);
    });

    it('should handle large arrays', () => {
      const largeUserArray: UserDto[] = Array.from(
        { length: 100 },
        (_, index) => ({
          id: index + 1,
          name: `User ${index + 1}`,
          username: `user${index + 1}`,
          email: `user${index + 1}@example.com`,
          phone: `${index + 1}-${index + 1}-${index + 1}`,
        }),
      );

      service.setUsers(largeUserArray);
      expect(service.users.length).toBe(100);
      expect(service.users[0].id).toBe(1);
      expect(service.users[99].id).toBe(100);
    });
  });
});
